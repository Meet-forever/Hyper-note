import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export default function login() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-8">
        <div className="w-full h-screen absolute">
            <Image src="/loginwallp.jpg" layout="fill" objectFit="cover"></Image>
        </div>
        <div className="mx-auto max-w-md py-8 px-8 bg-opacity-30 rounded-xl z-10 bg-gray-100 shadow-lg ">
            <form>
                <h1 className="text-center text-6xl font-semibold mx-8 px-6 py-3">Login</h1>
                <br/>
                <input type="email" className="px-4 py-3 w-full text-md rounded-md hover:bg-gray-100" placeholder="Email" />
                <br/>
                <br/>
                <input type="password" className='px-4 py-3 w-full text-md rounded-md hover:bg-gray-100 ' placeholder="Password" />
                <Link href="/forgotpassword"><div className="text-center p-1 cursor-pointer hover:text-gray-500 text-sm text-gray-400 w-full">Forgot Password?</div></Link>
                <br/>
                <button type="submit" className="p-3 rounded-md text-center bg-blue-300 w-full hover:bg-blue-400">Submit</button>
                <br/>
                <br/>
                <div className="w-full opacity-70 rounded-md flex flex-wrap justify-center items-center py-3 text-center border-2 bg-red-300 border-red-500">Error Section</div>
            </form>
        </div>
    </div>
  )
}
