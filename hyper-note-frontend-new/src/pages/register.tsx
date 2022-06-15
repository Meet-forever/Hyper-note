import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextPage } from 'next'

const register: NextPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-8">
        <div className="w-full h-screen absolute">
            <Image src="/loginwallp.jpg" layout="fill" objectFit="cover"></Image>
        </div>
        <div className="mx-auto max-w-md py-8 px-14 bg-opacity-40 rounded-xl z-10 bg-gray-100 shadow-lg ">
            <form className='flex flex-col gap-y-2 justify-center items-center'>
                <h1 className="text-center text-6xl font-semibold mx-6 py-3">Register</h1>
                <input name="firstname" type="text" className="px-4 py-2 w-full text-md rounded-md hover:bg-gray-100" placeholder="First Name" />
                <input name="lastname" type="text" className="px-4 py-2 w-full text-md rounded-md hover:bg-gray-100" placeholder="Last Name" />
                <input name= "email" type="email" className="px-4 py-2 w-full text-md rounded-md hover:bg-gray-100" placeholder="Email" />
                <input name= "password" type="password" className='px-4 py-2 w-full text-md rounded-md hover:bg-gray-100 ' placeholder="Password" />
                <input name="password2" type="password" className='px-4 py-2 w-full text-md rounded-md hover:bg-gray-100 ' placeholder="Password" />
                <button type="submit" className="p-3 rounded-md text-center text-gray-700 font-semibold bg-blue-300 w-full hover:bg-blue-400">Submit</button>
                <Link href="/forgotpassword"><div className="text-center p-1 cursor-pointer font-semibold hover:text-gray-600 text-sm text-gray-700  w-full">Already have an account?</div></Link>
                <div className="w-full flex flex-wrap justify-center items-center py-3  text-center border-2 opacity-70 rounded-md bg-red-300 border-red-500">Error Section</div>
            </form>
        </div>
    </div>
  )
}

export default register;