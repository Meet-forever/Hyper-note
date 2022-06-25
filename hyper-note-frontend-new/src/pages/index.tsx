import type { NextPage } from 'next'
import Router from "next/router"

const Home: NextPage = () => {
  return (
    <div className='flex h-screen w-full justify-center items-center flex-col'>
      <h1 className='font-semibold text-xl'>Index Page</h1>
      <br />
      <button className='p-2 rounded-md bg-gray-300' onClick={()=>Router.push("/auth/register")}>Register</button>      
      <br />
      <button className='p-2 rounded-md bg-gray-300' onClick={()=>Router.push("/auth/login")}>Login</button>
    </div>
  )
}

export default Home
