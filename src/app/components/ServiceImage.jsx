import Image from 'next/image'
import React from 'react'

const ServiceImage = ({ alt = "service", src, className, width = 1080, height = 1080, value }) => {
    return (
        <div className="relative">
            <div className="overflow-hidden">
                <Image
                    alt={alt}
                    src={src}
                    className={`${className} rounded-xl bg-gradient-to-r from-[#011B35] to-[#022C56] translate`}
                    width={width}
                    height={height}
                />
            </div>
            <div className="absolute top-6 left-6 text-white font-bold text-lg">
                <p className="lg:text-2xl text-md">{value}</p>
            </div>
        </div>
    )
}

export default ServiceImage