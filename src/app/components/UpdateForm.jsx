"use client";
import React, { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from './FormButton';
import { toast } from 'react-toastify';
import Image from 'next/image';

const UpdateForm = ({ update, blog }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [title, setTitle] = useState(blog?.title || "");
    const [content, setContent] = useState(blog?.content || "");
    const [isChange, setIsChange] = useState(false);

    const ref = useRef()

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Check if the file is an image
        if (file && file.type.match('image.*')) {
            // update a new file reader
            const reader = new FileReader();

            // Set the image preview when the file is loaded
            reader.onload = function (e) {
                setPreviewImage(e.target.result);
            }

            // Read the file as a data URL
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleCancelImage = () => {
        setPreviewImage(null);
        setIsChange(true);
    };

    return (
        <form
            ref={ref}
            action={async (formData) => {
                const response = await update(formData, previewImage, blog?.image);
                if (response?.error) {
                    toast.error(response.error);
                } else {
                    toast.success("Price updated successfully");
                    ref.current?.reset();
                }
            }}>
            <div className="p-3">
                <>
                    <div className={`relative ${!previewImage && isChange ? 'hidden' : 'block'}`}>
                        <FaTimes
                            size={25}
                            color="red"
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={handleCancelImage}
                        />
                        <Image width={1000} height={1000}  src={previewImage ? previewImage : blog?.image} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <div className={`mb-2 ${previewImage || !isChange ? 'hidden' : ''}`}>
                        <span>Attachments</span>
                        <div className="relative cursor-pointer h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                            <div className="absolute">
                                <div className="flex flex-col items-center ">
                                    <i className="fa fa-cloud-upload fa-3x text-gray-200"></i>
                                    <span className="block text-gray-900 font-normal">Attach you files here</span>
                                    <span className="block text-gray-900 font-normal">or</span>
                                    <span className="block text-gray-900 font-normal">Browse files</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="h-full w-full opacity-0 cursor-pointer"
                                name="update-image"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="flex justify-between items-center text-gray-900">
                            <span>Accepted file type: images</span>
                            <span className="flex items-center ">
                                <i className="fa fa-lock mr-1"></i> secure
                            </span>
                        </div>
                    </div>
                </>

                <div className="mb-2">
                    <span className="text-sm">Title</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter Title' required name="title" className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300" />
                </div>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} name='content' className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500" rows="8" placeholder="Enter your content..." required></textarea>

                <Button className="h-12 text-lg w-32 bg-gray-900 rounded text-white hover:bg-gray-700 my-3">
                    Update
                </Button>
            </div>
        </form>
    )
}

export default UpdateForm