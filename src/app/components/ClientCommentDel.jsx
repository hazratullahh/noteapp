"use client"

import { BsTrash } from 'react-icons/bs'
import Button from './FormButton'
import { deleteComment } from '../actions';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

const ClientComment = ({ blogId, commentId }) => {
    const router = useRouter()
    const [deleteModal, setDeleteModal] = useState(false);
    const handleDeleteModal = () => {
        setDeleteModal(true)
    }

    const deleteHandler = async (e) => {
        e.preventDefault();

        const res = await deleteComment(commentId);

        if (res?.error) {
            router.push(`/blogs/${blogId}`)
            return toast.error(res?.error)

        }
        toast.success("Deleted Succwssfully")
        router.push(`/blogs/${blogId}`)
        // redirect(`/blogs/${blogId}`)
    }

    return (
        <>
            <form >
                <Button type="button">
                    <BsTrash color="red" cursor="pointer" onClick={handleDeleteModal} />
                </Button>
            </form>

            <DeleteModal
                onClose={() => setDeleteModal(false)}
                showModal={deleteModal}
                deleteHandler={deleteHandler}
            />
        </>
    )
}

export default ClientComment