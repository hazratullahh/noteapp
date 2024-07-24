"use server"
import { revalidatePath } from "next/cache";
import connectDB from "../lib/connectDB";
import Blog from "../models/Note";
import Note from "../models/Note";

export const handleDelete = async (recordId) => {
    try {
        await connectDB();

        const result = await Note.findOneAndDelete({
            'details._id': recordId
        });

        if (!result) {
            throw new Error('No document was found and deleted.');
        }

        revalidatePath(`/notes/${result?.slug}`);
    } catch (err) {
        console.error('Error deleting record:', err);
    }
};

export const getBlogById = async (id) => {
    try {
        await connectDB();
        const response = await Blog.findOne({ _id: id })
        return response
    } catch (error) {
        console.log(error);

    }
}

export const getByDetailsId = async (recordId) => {
    try {
        await connectDB();
        const response = await Note.findOne({
            'details._id': recordId 
        });
        return response;

    } catch (error) {
        console.log(error);

    }
}

export const getAllBlogs = async () => {
    try {
        await connectDB();
        const response = await Blog.findOne({})
        return response
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = async (commentId) => {
    try {
        await connectDB();
        const blog = await Blog.findOneAndUpdate(
            { "comments._id": commentId },
            { $pull: { comments: { _id: commentId } } },
            {
                select: {
                    messages: {
                        $elemMatch: { _id: commentId },
                    },
                },
            },
        )

        if (!blog) {
            throw new Error("NOT FOUND!")
        }
        return blog;

    } catch (error) {
        console.log(error);
    }
}

export async function loadOptions() {
    try {
        await connectDB();
        const categories = await Note.distinct('details.category');
        return categories
        // return categories.map(category => ({
        //     label: category.label,
        //     value: category.value
        // }));
    } catch (error) {
        console.log(error);
        return [];
    }
}
