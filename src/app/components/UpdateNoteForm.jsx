"use client";

import ReactQuill, { Quill } from 'react-quill';
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import React, { useEffect } from "react";
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
import { FaEdit } from 'react-icons/fa';
import useModal from '@/hooks/useModal';

const UpdateNoteForm = ({ updateData, update }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

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
        defaultValues: {
            title: updateData?.details[0]?.title,
            category: {
                label: updateData?.details[0]?.category?.label,
                value: updateData?.details[0]?.category?.value
            },
            content: updateData?.details[0]?.content,
            status: updateData?.details[0]?.status === "completed",
        }
    });

    const completed = watch("completed", false);

    const handleCheckboxChange = (e) => {
        setValue('completed', e.target.checked);
    };

    const onSubmit = async (data) => {
        try {
            await update(data)
            reset();
            setOpen(false);
            toast.success("Note Successfully Updated")

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while submitting the form.');
        }
    };

    useEffect(() => {
        setValue("title", updateData?.details[0]?.title)
        setValue('category.label', updateData?.details[0]?.category?.label)
        setValue('category.value', updateData?.details[0]?.category?.value)
        setValue("contenet", updateData?.details[0]?.content)
        setValue("completed", updateData?.details[0]?.status === "Completed")
    }, [updateData, setValue])
 
    return (
        <>
            <Button size="sm" variant="text" className="border" onClick={handleOpen}>
                <FaEdit size={15} cursor="pointer" className="text-blue-500" />
            </Button>
            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className="mx-auto w-full max-w-[24rem]s">
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Update Note
                            </Typography>
                            <Input label="title" size="lg" error={errors?.title?.message}  {...register("title", { required: true })} />
                            {errors.title && (
                                <p className="text-red-500 text-sm -mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                            <AsyncSelectBox
                                name="category"
                                // loadOptions={loadOptions}
                                control={control}
                                errors={errors?.category}
                                placeholder="Update Category"
                                isSearchable={true}
                            />

                            <Checkbox
                                label="Completed"
                                name="completed"
                                checked={completed}
                                onChange={handleCheckboxChange}
                                {...register("completed")}
                            />

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
                        <CardFooter className="pt-0 flex justify-end items-center gap-2">
                            <Button variant="text" onClick={handleOpen} className="text-white bg-red-500 border border-red-500">
                                Cancel
                            </Button>
                            <FormButton type="submit" variant="text" className="text-white bg-teal-500 border border-teal-500">
                                {isSubmitting ? "Updating" : "Update"}
                            </FormButton>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    );
}

export default UpdateNoteForm