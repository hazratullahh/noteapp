"use client";

import ReactQuill, { Quill } from 'react-quill';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);

import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "../../material-tailwind/page";
import FormButton from './FormButton';
import AsyncSelectBox from './AsyncSelectBox';
import { noteSchema } from '@/schema/Note';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Step, Stepper } from '@material-tailwind/react';
import { CalculatorIcon, PresentationChartLineIcon } from '@heroicons/react/24/solid';

const AddNewNote = ({ create, isStep }) => {
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const [isDate, setIsDate] = useState('');
    const [isDateError, setIsDateError] = useState(false);

    const dateHandler = (event) => {
        const selectedDate = event.target.value;
        setIsDate(selectedDate);
        if (!selectedDate && !isDate) {
            setIsDateError(true);
        } else {
            setIsDateError(false);
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        control,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(noteSchema),
    });

    const completed = watch("completed", false);

    const handleCheckboxChange = (e) => {
        setValue('completed', e.target.checked);
    };

    const handleNext = () => {
        if (!isDate) {
            return setIsDateError(true);
        } else {
            setIsDateError(false)
        }
        return !isLastStep && setActiveStep((cur) => cur + 1)
    };

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    const handleOpen = () => setOpen((cur) => !cur);

    const onSubmit = async (data) => {
        try {
            data.date = isDate;
            await create(data)
            reset();
            setOpen(false);
            toast.success("Note Successfully Created")

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while submitting the form.');
        }
    };

    return (
        <>
            <Button className="bg-blue-gray-800 rounded-md" onClick={handleOpen}>Create New Task</Button>

            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >

                <form onSubmit={handleSubmit(onSubmit)}>
                    {isStep
                        ? <div className="w-full py-4 px-2 lg:px-8 bg-white overflow-y-scroll rounded-md">
                            <Stepper
                                activeStep={activeStep}
                                isLastStep={(value) => setIsLastStep(value)}
                                isFirstStep={(value) => setIsFirstStep(value)}
                            >
                                <Step onClick={() => setActiveStep(0)}>
                                    <CalculatorIcon className="h-5 w-5" />
                                </Step>
                                <Step onClick={() => isDateError && setActiveStep(1)}>
                                    <PresentationChartLineIcon className="h-5 w-5" />
                                </Step>
                            </Stepper>
                            {activeStep === 0 && (
                                <div className="mt-4">
                                    <Input type="date" value={isDate} onChange={dateHandler} label="Date" size="lg" error={isDateError} />
                                    {isDateError && <p className="text-red-500 text-sm mt-1">
                                        Date is required
                                    </p>}
                                </div>
                            )}

                            {activeStep === 1 && (
                                <Card className="mx-auto w-full max-w-[24rem]s h-[35rem] mt-2 shadow-none">
                                    <CardBody className="flex flex-col gap-4 px-0">
                                        <Typography variant="h4" color="blue-gray">
                                            Create New Note
                                        </Typography>
                                        <Input label="title" size="lg" error={errors?.title?.message} className="mb-1" {...register("title", { required: true })} />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.title.message}
                                            </p>
                                        )}
                                        <AsyncSelectBox
                                            name="category"
                                            control={control}
                                            errors={errors?.category}
                                            placeholder="Select Category"
                                            isSearchable={true}
                                        />

                                        <div className='flex items-center'>
                                            <Checkbox
                                                label="Completed"
                                                name="completed"
                                                checked={completed}
                                                onChange={handleCheckboxChange}
                                                {...register("completed")}
                                            />
                                        </div>

                                        <Controller
                                            name="content"
                                            id="content"
                                            control={control}
                                            theme="snow"
                                            render={({ field }) => (
                                                <ReactQuill
                                                    formats={[
                                                        'header',
                                                        'font',
                                                        'size',
                                                        'bold',
                                                        'blockquote',
                                                        'link',
                                                        'image',
                                                    ]}
                                                    modules={{
                                                        toolbar: [
                                                            [{ header: '1' }, { header: '2' }, { font: [] }],
                                                            [{ size: [] }],
                                                            ['bold', 'blockquote'],
                                                            ['link', 'image'],
                                                            ['clean']
                                                        ],
                                                        clipboard: {
                                                            matchVisual: false
                                                        },
                                                        imageResize: {
                                                            parchment: Quill.import('parchment'),
                                                            modules: ['Resize', 'DisplaySize']
                                                        },
                                                        blotFormatter: {}
                                                    }}
                                                    placeholder="Content"
                                                    {...field}
                                                    name="content"
                                                />
                                            )}
                                        />
                                        {errors.content && (
                                            <p className="text-red-500 text-sm -mt-1">
                                                {errors.content.message}
                                            </p>
                                        )}
                                    </CardBody>
                                    <CardFooter className="p-0 flex justify-end items-center gap-2">
                                        <Button variant="text" onClick={handleOpen} className="text-white bg-red-500 border border-red-500">
                                            Cancel
                                        </Button>
                                        <FormButton type="submit" variant="text" className="text-white bg-teal-500 border border-teal-500">
                                            {isSubmitting ? "Saving..." : "Save"}
                                        </FormButton>
                                    </CardFooter>
                                </Card>
                            )}

                            {!isLastStep
                                && <div className="mt-5 flex justify-end items-center">
                                    <Button onClick={handleNext} disabled={isLastStep}>
                                        Next
                                    </Button>
                                </div>
                            }
                        </div>
                        :
                        <Card className="mx-auto w-full max-w-[24rem]s h-[35rem] mt-2 shadow-none">
                            <CardBody className="flex flex-col gap-4 px-8">
                                <Typography variant="h4" color="blue-gray">
                                    Create New Note
                                </Typography>
                                <Input label="title" size="lg" error={errors?.title?.message} className="mb-1" {...register("title", { required: true })} />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                                <AsyncSelectBox
                                    name="category"
                                    control={control}
                                    errors={errors?.category}
                                    placeholder="Select Category"
                                    isSearchable={true}
                                />

                                <div className='flex items-center'>
                                    <Checkbox
                                        label="Completed"
                                        name="completed"
                                        checked={completed}
                                        onChange={handleCheckboxChange}
                                        {...register("completed")}
                                    />
                                </div>

                                <Controller
                                    name="content"
                                    id="content"
                                    control={control}
                                    theme="snow"
                                    render={({ field }) => (
                                        <ReactQuill
                                            formats={[
                                                'header',
                                                'font',
                                                'size',
                                                'bold',
                                                'blockquote',
                                                'link',
                                                'image',
                                            ]}
                                            modules={{
                                                toolbar: [
                                                    [{ header: '1' }, { header: '2' }, { font: [] }],
                                                    [{ size: [] }],
                                                    ['bold', 'blockquote'],
                                                    ['link', 'image'],
                                                    ['clean']
                                                ],
                                                clipboard: {
                                                    matchVisual: false
                                                },
                                                imageResize: {
                                                    parchment: Quill.import('parchment'),
                                                    modules: ['Resize', 'DisplaySize']
                                                },
                                                blotFormatter: {}
                                            }}
                                            placeholder="Content"
                                            {...field}
                                            name="content"
                                        />
                                    )}
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm -mt-1">
                                        {errors.content.message}
                                    </p>
                                )}
                            </CardBody>
                            <CardFooter className="flex justify-end items-center gap-2">
                                <Button variant="text" onClick={handleOpen} className="text-white bg-red-500 border border-red-500">
                                    Cancel
                                </Button>
                                <FormButton type="submit" variant="text" className="text-white bg-teal-500 border border-teal-500">
                                    {isSubmitting ? "Saving..." : "Save"}
                                </FormButton>
                            </CardFooter>
                        </Card>
                    }
                </form>
            </Dialog>
        </>
    );
}

export default AddNewNote