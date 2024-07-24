"use client"

import { BsTrash } from 'react-icons/bs'
import Button from './FormButton'
import { handleDelete } from '../actions';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

const DeleteActionBtn = ({ recordId }) => {
    const [deleteModal, setDeleteModal] = useState(false);

    const handleDeleteModal = () => {
        setDeleteModal(true)
    }

    const deleteHandler = async (e) => {
        e.preventDefault();

        const res = await handleDelete(recordId);

        if (res?.error) {
            return toast.error(res?.error)
        }
        setDeleteModal(false)
        toast.success("Deleted Succwssfully")
    }

    return (
        <>
            <form >
                <Button size="sm" variant="text" type="button" className="border cursor-pointer" onClick={handleDeleteModal} >
                    <BsTrash size={15} cursor="pointer" className="text-red-500" />
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

export default DeleteActionBtn