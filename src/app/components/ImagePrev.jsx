"use client";
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const ImagePrev = () => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Check if the file is an image
        if (file && file.type.match('image.*')) {
            // Create a new file reader
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
    };

    return (
        <>
            {!previewImage
                ?
                <div className="mb-2">
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
                            name="image"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center text-gray-900">
                        <span>Accepted file type: images</span>
                        <span className="flex items-center ">
                            <i className="fa fa-lock mr-1"></i> secure
                        </span>
                    </div>
                </div>
                :
                (
                    <div className="relative">
                        <FaTimes
                        size={25}
                        color="red"
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={handleCancelImage}
                        />
                        <Image width={1000} height={1000}  src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                )}
        </>
    );
};

export default ImagePrev;