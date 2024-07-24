import { Typography } from "@/material-tailwind/page";
import Link from "next/link";
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="w-full bg-[#37474F] text-white p-4">
            {/* <hr className="border-blue-gray-50" /> */}
            <Typography color="blue-gray" className="text-center font-normal text-white ">
                &copy; {new Date().getFullYear()} Note App
            </Typography>
        </footer>
    );
}