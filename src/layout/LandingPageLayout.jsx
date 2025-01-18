import React from "react";
import NavBar from "../component/NavBar";

import { Outlet } from "react-router-dom";
import Footer from "../component/guest/Footer";
import "../styles/component/guestNavbar.scss";
import GuestNavbar from "../component/guest/GuestNavbar";

const LandingPage = () => {
  return (
    <>
      <NavBar token="" />
      <div className="flex flex-col min-h-screen">
        <div className="flex w-0 shrink-0 xs:w-20 md:w-24 lg:max-w-none xl:-mr-0 xl:w-full xl:max-w-[18rem]"></div>
        <Outlet />
        <div className="mt-5 md:mt-10">
          <Footer />
        </div>
      </div>
      <GuestNavbar />
    </>
  );
};

export default LandingPage;
