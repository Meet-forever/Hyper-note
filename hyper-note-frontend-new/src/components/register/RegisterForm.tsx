import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react';

const RegisterForm = () => {
    const initialRegisterState = { firstname: "", lastname: "", email: "", password: "", confirmpassword: "" }
    const [register, setRegister] = useState(initialRegisterState)
    const initialErrorState = { ...initialRegisterState, error: false }
    const [error, setError] = useState(initialErrorState)
    const check = () =>{
        setError(initialErrorState)
        const { firstname, lastname, email, password } = register
        if (firstname !== "" && (firstname.length > 25 || firstname.length < 2)) setError(i => ({ ...i, firstname: "*first name is required", error: true }))
        if (lastname !== "" && (lastname.length > 25 || lastname.length < 2)) setError(i => ({ ...i, lastname: "*last name is required", error: true }))
        if (email !== "" && !email.match(/[a-z]+[a-z0-9]*@[a-z]+\.([a-z]{3}|[a-z]{2})/g)) setError(i => ({ ...i, email: "*email is invalid", error: true }))
        if (password !== "" && password.length < 8) setError(i => ({ ...i, password: "*password must be at least 8 characters.", error: true }))
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { firstname, lastname, email } = register
        if (firstname === "") setError(i => ({ ...i, firstname: "*first name is required", error: true }))
        if (lastname === "") setError(i => ({ ...i, lastname: "*last name is required", error: true }))
        if (email === "") setError(i => ({ ...i, email: "*email is invalid", error: true }))
        check()
        if (error.error) return
    }

    useEffect(() => {
        check()
        setError(i => ({ ...i, confirmpassword: "*password doesn't match", error: true }))
        if (register.confirmpassword === register.password) setError(i => ({ ...i, confirmpassword: "", error: false }));
    }, [register])

    return (
        <div className="mx-auto max-w-sm w-full py-8 px-14 bg-opacity-70 rounded-xl z-10 bg-gray-100 shadow-lg ">
            <form className='flex flex-col text-xs sm:text-sm  justify-center items-center' onSubmit={handleSubmit}>
                <div className='flex justify-between items-center'>
                    <div>
                        <input onChange={(e) => setRegister(i => ({ ...i, firstname: e.target.value }))} name="firstname" type="text" className={`px-4 mr-1 py-3 w-full focus:outline-none focus:shadow-outline  rounded-md hover:bg-stone-50 ${error.firstname ? `border border-red-500` : ``}`} placeholder="First Name" />
                        {error.firstname !== "" ? <p className="text-red-500 px-2 py-1 text-xs italic">{error.firstname}</p> : <p className='p-2'> </p>}
                    </div>
                    <div>
                        <input onChange={(e) => setRegister(i => ({ ...i, lastname: e.target.value }))} name="lastname" type="text" className={`px-4 ml-1 py-3 w-full focus:outline-none focus:shadow-outline rounded-md hover:bg-stone-50 ${error.lastname ? `border border-red-500` : ``}`} placeholder="Last Name" />
                        {error.lastname !== "" ? <p className="text-red-500 px-2 py-1 text-xs italic">{error.lastname}</p> : <p className='p-2'> </p>}
                    </div>
                </div>
                <input onChange={(e) => setRegister(i => ({ ...i, email: e.target.value }))} name="email" type="email" className={`px-4 py-3 w-full focus:outline-none focus:shadow-outline text-md rounded-md hover:bg-stone-50 ${error.email ? `border border-red-500` : ``}`} placeholder="Email" />
                {error.email !== "" ? <p className="text-red-500 px-2 py-1 w-full text-xs italic">{error.email}</p> : <p className='p-2 w-full'></p>}
                <input onChange={(e) => setRegister(i => ({ ...i, password: e.target.value }))} name="password" type="password" className={`px-4 py-3 w-full focus:outline-none focus:shadow-outline rounded-md hover:bg-stone-50 ${error.password ? `border border-red-500` : ``}`} placeholder="Password" />
                {error.password !== "" ? <p className="text-red-500 px-2 py-1 w-full text-xs italic">{error.password}</p> : <p className='p-2'></p>}
                <input onChange={(e) => setRegister(i => ({ ...i, confirmpassword: e.target.value }))} name="confirmpassword" type="password" className={`px-4 py-3 w-full focus:outline-none focus:shadow-outline rounded-md hover:bg-stone-50 ${error.confirmpassword ? `border border-red-500` : ``}`} placeholder="Confirm Password" />
                {error.confirmpassword !== "" ? <p className="text-red-500 px-2 py-1 w-full text-xs italic">{error.confirmpassword}</p> : <p className='p-2'></p>}
                <button type="submit" className="p-3 rounded-md text-center text-gray-700 font-semibold bg-blue-300 w-full hover:bg-blue-400">Register</button>
                <div className='text-center p-1 cursor-pointer font-semibold text-sm text-gray-700  w-full'>Already have an Account?<Link href="/auth/login"><div className=" text-sky-700 hover:text-sky-500">Log In</div></Link></div>
            </form>
            <div className='flex justify-center w-full items-center text-xs text-gray-500'>
                <span className='w-1/3 border-[1px] border-gray-400 ' /> <div className='px-2 text-gray-500 font-semibold'>OR</div> <span className='w-1/3 border-[1px] border-gray-400 ' />
            </div>
            <div className='text-3xl flex w-full justify-evenly '>
                <button type="button" onClick={()=> signIn("google", {callbackUrl: "/home"})}><FaGoogle color='#5f5f5f' /></button>
                <button type="button" onClick={()=> signIn("github", {callbackUrl: "/home"})}><FaGithub color='#5f5f5f' /></button>
            </div>
        </div>
    )
}

export default RegisterForm