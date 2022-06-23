import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextPage } from 'next'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import NavBar1 from '../components/navbar_components/NavBar1'

const register: NextPage = () => {
  return (
    <div>
      <NavBar1 />
      <div className="w-full h-screen flex items-center justify-center p-8">
        <div className="w-full h-screen absolute">
          <Image src="/loginwallp.jpg" layout="fill" objectFit="cover"></Image>
        </div>
        <div className="mx-auto max-w-sm w-full py-8 px-14 bg-opacity-70 rounded-xl z-10 bg-gray-100 shadow-lg ">
          <form className='flex flex-col text-xs sm:text-sm gap-y-2 justify-center items-center'>
            {/* <h1 className="text-center text-[3.5rem] font-semibold mx-6 py-3">Register</h1> */}
            <div className='flex justify-between items-center'>
              <input name="firstname" type="text" className="px-4 mr-1 py-2 w-full  rounded-md hover:bg-gray-100" placeholder="First Name" />
              <input name="lastname" type="text" className="px-4 ml-1 py-2 w-full rounded-md hover:bg-gray-100" placeholder="Last Name" />
            </div>
            <input name="email" type="email" className="px-4 py-2 w-full text-md rounded-md hover:bg-gray-100" placeholder="Email" />
            <input name="password" type="password" className='px-4 py-2 w-full  rounded-md hover:bg-gray-100 ' placeholder="Password" />
            <input name="password2" type="password" className='px-4 py-2 w-full  rounded-md hover:bg-gray-100 ' placeholder="Confirm Password" />
            <button type="submit" className="p-3 rounded-md text-center text-gray-700 font-semibold bg-blue-300 w-full hover:bg-blue-400">Register</button>
            <div className='text-center p-1 cursor-pointer font-semibold text-sm text-gray-700  w-full'>Already have an Account?<Link href="/forgotpassword"><div className=" text-sky-700 hover:text-sky-500">Log In</div></Link></div>
            {/* <div className="w-full flex flex-wrap justify-center items-center py-3  text-center border-2 opacity-70 rounded-md bg-red-300 border-red-500">Error Section</div> */}
            <div className='flex justify-center w-full items-center text-xs text-gray-500'>
              <span className='w-1/3 border-[1px] border-gray-400 ' /> <div className='px-2 text-gray-500 font-semibold'>OR</div> <span className='w-1/3 border-[1px] border-gray-400 ' />
            </div>
            <div className='text-3xl flex justify-evenly w-full '>
              <FaGoogle color='gray' />
              <FaGithub color='gray' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default register;