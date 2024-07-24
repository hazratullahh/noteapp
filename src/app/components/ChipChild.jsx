"use client"
import { Chip } from '@material-tailwind/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const ChipChild = ({ value }) => {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

    const chipHandler = (e) => {
        const category = e.target.textContent;
        const params = new URLSearchParams(searchParams.toString());

        if (category.toLowerCase() === "all") {
            params.delete('category');
        } else {
            params.set('category', category);
        }

        replace(`${pathname}?${params.toString()}`);
    }

    const activeCategory = searchParams.get('category');
    const isActive = activeCategory === value || (!activeCategory && value.toLowerCase() === "all");

    return (
        <Chip
            variant="gradient"
            value={value}
            onClick={chipHandler}
            className={`cursor-pointer rounded-full from-blue-gray-900 to-blue-gray-800 ${isActive ? 'shadow-lg shadow-blue-gray-600' : ''}`}
        />
    )
}

export default ChipChild
