import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./auth/Dropdown";
import NavBarPartial from "./guest/NavBarPartial";
import { GiClothesline } from "react-icons/gi";
import useScrollVisibility from "../hooks/useScrollVisibility";

import "../styles/component/navbar.scss";

const NavBar = ({ token }) => {
  const showNavBar = useScrollVisibility()
  
  return (
    <>
      <div className={`nav-bar-container ${showNavBar ? "visible" : "hidden"}`}>
        <div
          className={`ml-0 bg-white shadow-md max:shadow-none text-sm font-semibold wrap-navbar flex justify-between`}
        >
          <div className="flex space-x-3 items-center">
            <div className="item-center space-x-1 items-center px-2 py-1.5 text-lg cursor-pointer">
              <GiClothesline className="block xs:hidden md:block h-[50px] w-[50px] tab:h-[60px] tab:w-[60px] text-blue-400" />
          </div>
          </div>
          <div className="flex items-center space-x-3">
            {token && <Dropdown />}
            {!token && <NavBarPartial />}
          </div>
        </div>
      </div>
    </>
  );
};

NavBar.propTypes = {
  token: PropTypes.string.isRequired,
};

export default NavBar;