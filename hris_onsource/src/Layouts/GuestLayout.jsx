import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context'

function GuestLayout() {



  const {token} = useAuth();
  if(token) {
    return <Navigate to='/dashboard' />
  }

  return (
    <div className='h-screen w-full flex'>
      <div className="flex-1  flex justify-center items-center">
      <Outlet />
      </div>
      <div className='flex-1 flex justify-center items-center mr-48 max-sm:hidden'>
       <img src="undraw_secure_login_pdn4.svg" alt="secure_login" srcSet="" />
      </div>
    </div>
  )
}

export default GuestLayout