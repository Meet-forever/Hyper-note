import React from 'react'
import Image from 'next/image'
export default function CoverImage() {
  return (
    <div className="h-[30vh] w-full relative">
      <Image src="/images/themes/test2.jpg" alt="pattern" layout='fill' objectFit='cover' />
    </div>
  )
}
