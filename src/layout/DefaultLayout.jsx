import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import SideBar from "../component/auth/SideBar";
import NavBar from "../component/NavBar";
import Modal from "../component/Modal";
import { setUser } from "../store/sliceUser";
import Loader from "../component/auth/Loader";

const DefaultLayout = () => {
  const { token, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to={"/guest/login"} />;
  }

  return (
    <>
      <NavBar token={token} />
      <SideBar />
      <Outlet />
      <Toaster className="text-lg" position="top-right" />
      <Modal />
    </>
  );
};

export default DefaultLayout;
