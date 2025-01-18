import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const GuestLayout = () => {
  const { token } = useSelector((state) => state.user);

  if (token) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <Outlet />
      <Toaster className="text-lg" position="top-left" />
    </>
  );
};

export default GuestLayout;
