import { revalidatePath } from 'next/cache';
import connectDB from '../lib/connectDB';
import Blog from '../models/Note';
import Button from './FormButton';

const CommentForm = ({ blogId }) => {
    async function AddComment(formData) {
        "use server"

        try {
            await connectDB()
            const price = await Blog.findById(blogId);

            if (!price) {
                throw new Error("NOT FOUND!")
            }

            const newComment = {
                content: formData.get('content'),
            }

            price.comments.push(newComment)
            await price.save()
            revalidatePath(`blogs/${price?._id}`)

        } catch (error) {
            // toast.error(error)
            console.error("Error creating blog:", error);
        }
    }

    return (
        <form action={AddComment}>
            <div className="relative my-5">
                <textarea
                    type="text"
                    rows={2}
                    name='content'
                    placeholder='Tell us your idea...'
                    className="px-10 py-2 rounded-lg break-words break-before-all border w-full focus:outline-none focus:border-indigo-500"
                />
                <div className={`absolute top-0 right-0 flex items-center h-full mx-3`}>
                    <Button>
                        Add
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default CommentForm