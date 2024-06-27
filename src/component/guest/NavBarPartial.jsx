import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import navbarPartial from '../../styles/component/navbarPartial.module.scss';

const NavBarPartial = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className={`${navbarPartial.menu} hidden xs:block`}>
        <ul className={`${navbarPartial.mainMenu}`}>
          <li className={isActive('/') ? navbarPartial.active : ''}>
            <Link to={'/'}>Home</Link>
          </li>
          <li className={isActive('/services') ? navbarPartial.active : ''}>
            <Link to={'/services'}>Services</Link>
          </li>
          <li className={isActive('/terms') ? navbarPartial.active : ''}>
            <Link to={'/terms'}>Terms</Link>
          </li>
          <li className={isActive('/guest/login') ? navbarPartial.active : ''}>
            <Link to={'/guest/login'}>Login</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBarPartial;
