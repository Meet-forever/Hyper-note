import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextPage } from 'next'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import NavBar1 from '../components/navbar_components/NavBar1'

const login: NextPage = () => {
  return (
    <div>
      <NavBar1 />
      <div className="w-full h-screen flex items-center justify-center p-8">
        <div className="w-full h-screen absolute">
          <Image src="/loginwallp.jpg" layout="fill" objectFit="cover"></Image>
        </div>
        <div className="mx-auto max-w-xs w-full pb-8 pt-8 px-8 bg-opacity-70 rounded-xl z-10 bg-gray-100 shadow-lg ">
          <form className='flex flex-col gap-y-4'>
            <input name="email" type="email" className="px-4 py-3 w-full text-md rounded-md hover:bg-gray-100" placeholder="Email" />
            <input name="password" type="password" className='px-4 py-3 w-full text-md rounded-md hover:bg-gray-100 ' placeholder="Password" />
            <div className='block md:flex justify-center items-center'>
              <button type="submit" className="p-3 text-gray-700 font-semibold rounded-md text-center w-full bg-blue-300 hover:bg-blue-400">Login</button>
              <Link href="/forgotpassword"><div className="text-center p-1 cursor-pointer text-sm font-semibold text-sky-600 hover:text-blue-400 w-full">Forgot Password?</div></Link>
            </div>
            <div className='flex justify-center items-center text-xs text-gray-500'>
              <hr className='w-1/3 bg-gray-300 h-[0.14rem] ' /> <div className='px-2 text-gray-400 font-semibold'>OR</div> <hr className='w-1/3 bg-gray-300 h-[0.14rem]' />
            </div>
            <div className='text-3xl flex justify-evenly '>
              <FaGoogle color='gray' />
              <FaGithub color='gray' />
            </div>
            {/* <div className="w-full opacity-70 rounded-md flex flex-wrap justify-center items-center py-3 text-center border-2 bg-red-300 border-red-500">Error Section</div> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default login