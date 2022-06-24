import React from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import NavBar1 from '../components/navbar_components/NavBar1'
import RegisterForm from '../components/register_component/RegisterForm'

const register: NextPage = () => {
  return (
    <div>
      <NavBar1 />
      <div className="w-full h-screen flex items-center justify-center p-8">
        <div className="w-full h-screen absolute">
          <Image src="/loginwallp.jpg" layout="fill" objectFit="cover"></Image>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default register;