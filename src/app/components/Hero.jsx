import Image from 'next/image'
import Link from 'next/link'
import React, { lazy } from 'react'

export const Hero = () => {
    return (
        <div className='relative flex items-center justify-center overflow-hidden sm:h-[620px] h-[calc(100vh+4rem)] isolate'>
        <div className="grid max-w-lg grid-cols-1 px-4 mx-auto lg:grid-cols-2 sm:max-w-5xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='max-w-2xl pt-4 sm:pt-10'>
            <div className="sm:pt-4">
  
              <h1 className="lg:leading-snug md:leading-snug text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-4xl lg:text-5xl">
                <span className="text-blue-600">Sadat Sherkhani:</span> Your Trusted Ally in Mastering Afghan Logistics Intricacies
              </h1>
              <p className="my-6 text-lg text-gray-700 sm:text-lg mb-10">
                Lorem ipsum dolor sit amet consectetur. Amet ipsum placerat aliquam ut nulla vivamus. Consectetur turpis aliquam egestas et nulla consectetur blandit.
              </p>
  
              <Link href="/blogs" className="bg-blue-600 text-white rounded-3xl px-5 py-3">Get Started</Link>
  
            </div>
          </div>
  
          <div className='max-w-2xl pt-10 sm:pt-10'>
            <div className="sm:pt-4">
              <Image alt="banner" src="/banner.png" className="shadow-none bg-transparent go-up" width={1080} height={1000} />
            </div>
          </div>
        </div> 

        <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] -z-10" aria-hidden="true"><defs><pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M100 200V.5M.5 .5H200" fill="none"></path></pattern></defs><svg x="50%" y="-1" className="overflow-visible fill-gray-50"><path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0"></path></svg><rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"></rect></svg>
      </div>
    )
}
