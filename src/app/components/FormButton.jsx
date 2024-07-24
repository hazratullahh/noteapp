"use client";
import { Button } from '../../material-tailwind/page';
import { useFormStatus } from 'react-dom'

const FormButton = ({ children, data_modal, className, size, variant, type, onClick }) => {
    const { pending } = useFormStatus()

    return (
        <Button data-modal-hidet={data_modal} type={type} disabled={pending} variant={variant} size={size} className={className} onClick={onClick}>
            {children} {pending && "..."}
        </Button>
    )
}

export default FormButton