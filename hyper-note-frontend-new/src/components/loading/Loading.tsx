import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
        <Image src="/loading.gif" height={100} width={100} ></Image>
    </div>
  )
}

export default Loading