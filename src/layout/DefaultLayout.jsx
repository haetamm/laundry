import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import SideBar from '../component/auth/SideBar'
import NavBar from '../component/NavBar'
import Modal from '../component/Modal'

const DefaultLayout = () => {
  const { token } = useSelector((state) => state.user)

  if (!token) {
    return <Navigate to={'/guest/login'} />;
  }
  
  return (
    <>
      <NavBar token={token} />
      <SideBar />
      <Outlet />
      <Toaster className="text-lg" position='top-right' />
      <Modal />
    </>
  );
};

export default DefaultLayout;
