import React from 'react'
import Image from 'next/image'
export default function CoverImage({selected}) {
  return (
    <div className="h-[30vh] w-full relative">
      <Image src={selected.cover} alt="pattern" layout='fill' objectFit='cover' />
    </div>
  )
}
