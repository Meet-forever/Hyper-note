import { NextPage } from 'next'
import React from 'react'
import Sidebar from '../components/home_components/Sidebar'
import UserPage from '../components/home_components/UserPage'

const home: NextPage = () => {
  return (
    <div className='grid grid-cols-8 md:grid-cols-6'>
        <Sidebar />
        <UserPage />
    </div>
  )
}

export default home