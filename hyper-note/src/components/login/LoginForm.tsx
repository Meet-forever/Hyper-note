import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { signIn } from "next-auth/react"

const LoginForm = () => {
    const initialLogin = { email: "guest@example.com", password: "12345678" }
    const initialErrorState = { email: "", password: "", error: false }
    const [error, setError] = useState(initialErrorState)
    const [login, setLogin] = useState(initialLogin);

    const handleEmailLogin = () => {
        signIn("credentials", { email: login.email, password: login.password, callbackUrl: "/home" })
    }

    useEffect(() => {
        setError(initialErrorState)
        const { email, password } = login
        // if(email === "") setError(i => ({ ...i, email: "*email is required.", error: true }))
        // if(password === "") setError(i => ({ ...i, password: "*password is required.", error: true }))
        if (email !== "" && !(email.match(/[a-z]+[a-z0-9]*@[a-z]+\.([a-z]{3}|[a-z]{2})/g))) setError(i => ({ ...i, email: "*email is not valid.", error: true }))
        if (password !== "" && password.length < 8 || password.length > 30) setError(i => ({ ...i, password: "password must be at least 8 characters long.", error: true }))
    }, [login.email, login.password])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!error.error) handleEmailLogin();
    }
    return (
        <div className="mx-auto max-w-xs w-full pb-8 pt-8 px-8 bg-opacity-70 rounded-xl z-10 bg-gray-100 shadow-lg ">
            <form className='flex flex-col gap-y-2' onSubmit={handleSubmit}>
                <input value={login.email} onChange={(e) => setLogin(i => ({ ...i, email: e.target.value }))} required={true} name="email" type="email" className={`px-4 py-3 w-full text-md rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-100 ${error.email ? `border border-red-500` : ``}`} placeholder="Email" />
                {error.email !== "" ? <p className="text-red-500 px-2 text-xs italic">{error.email}</p> : <p className="px-2 w-full"> </p>}
                <input value={login.password} onChange={(e) => setLogin(i => ({ ...i, password: e.target.value }))} required={true} name="password" type="password" className={`px-4 py-3 w-full text-md rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-100 ${error.password ? `border border-red-500` : ``} `} placeholder="Password" />
                {error.password !== "" ? <p className="text-red-500 px-2 text-xs italic">{error.password}</p> : <p className="px-2 w-full"> </p>}
                <div className='block md:flex justify-center items-center'>
                    <button onClick={(e) => e.stopPropagation()} className="p-3 text-gray-700 font-semibold rounded-md text-center w-full bg-blue-300 hover:bg-blue-400">Login</button>
                    <Link href="/forgotpassword"><div className="text-center p-1 cursor-pointer text-sm font-semibold text-sky-600 hover:text-blue-400 w-full">Forgot Password?</div></Link>
                </div>
                <div className='text-center p-1 cursor-pointer font-semibold text-sm text-gray-700  w-full'>Don't have an Account?<Link href="/auth/register"><div className=" text-sky-700 hover:text-sky-500">Register</div></Link></div>
            </form>
            <div className='flex py-2 justify-center w-full items-center text-xs text-gray-500'>
                <span className='w-1/3 border-[1px] border-gray-400 ' /> <div className='px-2 text-gray-500 font-semibold'>OR</div> <span className='w-1/3 border-[1px] border-gray-400 ' />
            </div>
            <div className='text-3xl flex justify-evenly '>
                <button onClick={() => signIn("google", { callbackUrl: "/home" })}><FaGoogle color='#5f5f5f' /></button>
                <button onClick={() => signIn("github", { callbackUrl: "/home" })}><FaGithub color='#5f5f5f' /></button>
            </div>
        </div>
    )
}

export default LoginForm