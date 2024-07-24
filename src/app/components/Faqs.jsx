"use client"

import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@/material-tailwind/page";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

const Faqs = () => {
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <article className="grid max-w-lg grid-cols-1 px-4 mx-auto lg:grid-cols-2 sm:max-w-5xl sm:px-6 lg:max-w-7xl lg:px-8 mb-14">
            <div className='max-w-2xl pt-6 sm:pt-18'>
            <h3 className="pt-4 text-4xl font-bold">FAQs</h3>    
            <p className="py-4">Lorem ipsum dolor sit amet consectetur. Amet ipsum placerat aliquam ut nulla vivamus. Consectetur turpis aliquam egestas et nulla consectetur blandit. </p>           
            </div>

            <div className="pt-6 sm:pt-18">
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(1)}>What is Material Tailwind?</AccordionHeader>
                    <AccordionBody>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        How to use Material Tailwind?
                    </AccordionHeader>
                    <AccordionBody>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        What can I do with Material Tailwind?
                    </AccordionHeader>
                    <AccordionBody>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
            </div>
        </article>
    );
}

export default Faqs;