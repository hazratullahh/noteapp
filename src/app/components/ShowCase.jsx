import {
    Breadcrumbs
} from "@/material-tailwind/page";
import Link from "next/link";

const ShowCase = ({ titles }) => {
    return (
        <div className="grid max-w-lg grid-cols-1 px-4 mx-auto lg:grid-cols-2 sm:max-w-5xl sm:px-6 lg:max-w-7xl lg:px-8 mb-14">
            <div className='max-w-2xl pt-6 sm:pt-18'>
                <Breadcrumbs>
                    <Link href="/" className="opacity-60 flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        {titles[0]}
                    </Link>
                    <Link href="#">{titles[1]}</Link>
                </Breadcrumbs>

                <h5 className="pt-6 t-18 text-4xl font-bold">{titles[1]}</h5>
            </div>

            <div className="pt-6 sm:pt-18">
                Lorem ipsum dolor sit amet consectetur. Amet ipsum placerat aliquam ut nulla vivamus. Consectetur turpis aliquam egestas et nulla consectetur blandit. Est ullamcorper phasellus egestas est egestas velit enim vel. Eros dolor sit at pellentesque feugiat lectus lacus.
            </div>
        </div>
    )
}

export default ShowCase