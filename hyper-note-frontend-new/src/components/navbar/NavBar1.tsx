import Image from 'next/image'
import React from 'react'
import {AiFillHome} from 'react-icons/ai'
import Router from 'next/router'

const NavBar1 = () => {
  return (
    <div className='w-full h-12 p-6 absolute z-10'>
        <div className='max-w-4xl  mx-auto flex justify-between items-center'> 
            <Image src="/logo.svg" width={200} height={50}/>
        <button onClick={()=> Router.push("/")}><AiFillHome /></button>
        </div>
    </div>
  )
}

export default NavBar1