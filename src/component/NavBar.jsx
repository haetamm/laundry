import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Dropdown from './auth/Dropdown'
import NavBarPartial from './guest/NavBarPartial'
import { GiClothesline } from 'react-icons/gi'

import '../styles/component/navbar.scss'

const NavBar = ({ token }) => {
    const [showNavBar, setShowNavBar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(window.scrollY)

    const controlNavBar = useCallback(() => {
        if (window.scrollY > lastScrollY) {
            setShowNavBar(false);
        } else {
            setShowNavBar(true);
        }
        setLastScrollY(window.scrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener('scroll', controlNavBar);
        return () => {
            window.removeEventListener('scroll', controlNavBar);
        };
    }, [controlNavBar]);
    
    const { pathname } = useLocation()
    const pathSegments = pathname.split('/').filter(Boolean)
    const path = pathSegments[1] || ''


    return (
        <>
            <div className={`nav-bar-container ${showNavBar ? 'visible' : 'hidden'}`}>
                <div className={`${token ? 'ml-0 xl:w-[calc(100%-60px)] xl:ml-[60px] bg-black opacity-95 px-[15px] py-[5px]' : 'ml-0 bg-white shadow-md'} text-sm font-semibold wrap-navbar flex justify-between`}>
                    <div className="flex space-x-3 items-center ">
                        <div className=" item-center space-x-1 items-center px-2 py-1.5 text-lg cursor-pointer">
                            {token && <div className="flex tab:hidden ml-0 xs:ml-[60px] xl:ml-0">{path === "user" ? "ADMIN" : path.toUpperCase()}</div>}
                            {!token && <GiClothesline className="block xs:hidden md:block h-[50px] w-[50px] tab:h-[60px] tab:w-[60px] text-blue-400"/>}
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        {token && <Dropdown />}
                        {!token && <NavBarPartial />}
                    </div>
                </div>
            </div>
        </>
    )
}

NavBar.propTypes = {
    token: PropTypes.string.isRequired
}

export default NavBar