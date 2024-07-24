"use client"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ToastMsg = ({type}) => {
  return (
    <>
    {toast.success('Price created successfully!')}
    {/* <ToastContainer /> */}
    </>
  )
}

export default ToastMsg