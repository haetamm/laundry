import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../../styles/component/guestNavbar.scss';

const GuestNavbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const isOpen = useSelector((state) => state.navbarGuest.isOpen);
  const dispatch = useDispatch();

  const toggleNavbarGuest = () => {
    dispatch({
      type: isOpen ? 'CLOSE_NAVBAR_GUEST' : 'OPEN_NAVBAR_GUEST',
    });
  };

  return (
    <>
      <div className="inline xs:hidden">
        <div className={`menu-btn-navbar-guest ${isOpen ? 'open' : ''}`} onClick={toggleNavbarGuest}>
          <span></span>
        </div>
        <div className={`wrapper-navbar-guest ${isOpen ? 'open' : ''}`}>
          <ul>
            <li className={`${isOpen ? 'open' : ''} ${isActive('/') ? 'active' : ''}`}>
              <Link onClick={toggleNavbarGuest} to={'/'}>
                Home
              </Link>
            </li>
            <li className={`${isOpen ? 'open' : ''} ${isActive('/services') ? 'active' : ''}`}>
              <Link onClick={toggleNavbarGuest} to={'/services'}>
                Services
              </Link>
            </li>
            <li className={`${isOpen ? 'open' : ''} ${isActive('/terms') ? 'active' : ''}`}>
              <Link onClick={toggleNavbarGuest} to={'/terms'}>
                Terms
              </Link>
            </li>
            <li className={`${isOpen ? 'open' : ''} ${isActive('/guest/login') ? 'active' : ''}`}>
              <Link onClick={toggleNavbarGuest} to={'/guest/login'}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GuestNavbar;
