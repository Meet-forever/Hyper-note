import React from 'react'
import CoverImage from './CoverImage'
import TextContent from './TextContent';
import Image from 'next/image'

export default function UserPage() {

    return (
        <div className="h-screen text-2xl font-semibold w-full">
            <CoverImage />
            <span className="relative -top-10 left-20">
                <Image src="/images/emojis/documents.png" width="80" height="80"  objectFit="contain"/>
            </span>
            <TextContent />
        </div>
    )
}
