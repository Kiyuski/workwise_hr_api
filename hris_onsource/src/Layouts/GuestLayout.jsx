import React from 'react'
import { Outlet } from 'react-router-dom'

function GuestLayout() {
  return (
    <div className='h-screen w-full flex'>
      <div className="flex-1  flex justify-center items-center">
      <Outlet />
      </div>
      <div className='flex-1 '>
      
      </div>
    </div>
  )
}

export default GuestLayout