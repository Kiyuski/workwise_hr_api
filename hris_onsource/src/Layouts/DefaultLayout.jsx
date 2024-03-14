import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context';


function DefaultLayout() {
  const {token} = useAuth();
  if(!token) {
    return <Navigate to='/login' />
  }

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default DefaultLayout