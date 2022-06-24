import React, { useState } from 'react'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'

const LoginForm = () => {
    const initialLogin = {email: "", password: ""}
    const initialErrorState = { ...initialLogin, error: false }
    const [error, setError] = useState(initialErrorState)
    const [login, setLogin] = useState(initialLogin);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {email, password} = login
        setError(initialErrorState)
        if(!(email.match(/[a-z]+[a-z0-9]*@[a-z]+\.([a-z]{3}|[a-z]{2})/g))) setError(i => ({ ...i, email: "*email is not valid.", error: true })) 
        if (password.length < 8) setError(i => ({ ...i, password: "*password must be at least 8 characters.", error: true }))
        if(error.error) return
        console.log(email, password)
    }
    return (
        <div className="mx-auto max-w-xs w-full pb-8 pt-8 px-8 bg-opacity-70 rounded-xl z-10 bg-gray-100 shadow-lg ">
            <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
                <input onChange={(e) => setLogin(i => ({...i, email: e.target.value}))} name="email" type="email" className={`px-4 py-3 w-full text-md rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-100 ${error.email ? `border border-red-500` : ``}`} placeholder="Email" />
                {error.email !== "" ? <p className="text-red-500 px-2 text-xs italic">{error.email}</p> : <p></p>}
                <input onChange={(e) => setLogin(i => ({...i, password: e.target.value}))} name="password" type="password" className={`px-4 py-3 w-full text-md rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-100 ${error.password ? `border border-red-500` : ``} `} placeholder="Password" />
                {error.password !== "" ? <p className="text-red-500 px-2 text-xs italic">{error.password}</p> : <p></p>}
                <div className='block md:flex justify-center items-center'>
                    <button type='submit' className="p-3 text-gray-700 font-semibold rounded-md text-center w-full bg-blue-300 hover:bg-blue-400">Login</button>
                    <Link href="/forgotpassword"><div className="text-center p-1 cursor-pointer text-sm font-semibold text-sky-600 hover:text-blue-400 w-full">Forgot Password?</div></Link>
                </div>
                <div className='text-center p-1 cursor-pointer font-semibold text-sm text-gray-700  w-full'>Don't have an Account?<Link href="/register"><div className=" text-sky-700 hover:text-sky-500">Register</div></Link></div>
            </form>
            <div className='flex py-2 justify-center w-full items-center text-xs text-gray-500'>
                <span className='w-1/3 border-[1px] border-gray-400 ' /> <div className='px-2 text-gray-500 font-semibold'>OR</div> <span className='w-1/3 border-[1px] border-gray-400 ' />
            </div>
            <div className='text-3xl flex justify-evenly '>
                <button><FaGoogle color='#6D6D6D' /></button>
                <button><FaGithub color='#6D6D6D' /></button>
            </div>
        </div>
    )
}

export default LoginForm