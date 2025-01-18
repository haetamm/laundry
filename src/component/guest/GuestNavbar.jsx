import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isActive, menuFields, scrollTop } from "../../utils/helper";
import "../../styles/component/guestNavbar.scss";

const GuestNavbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="inline xs:hidden">
      <div
        className={`menu-btn-navbar-guest ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
      </div>
      <div className={`wrapper-navbar-guest ${open ? "open" : ""}`}>
        <ul>
          {menuFields.map(({ path, label }) => (
            <li
              key={path}
              className={`${open ? "open" : ""} ${
                isActive(pathname, path) ? "active" : ""
              }`}
            >
              <Link
                onClick={() => {
                  setOpen(!open);
                  scrollTop();
                }}
                to={path}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GuestNavbar;
