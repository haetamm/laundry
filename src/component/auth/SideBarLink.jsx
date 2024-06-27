import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const SideBarLink = ({ to, icon: Icon, label }) => {
    const dispatch = useDispatch()
    const {pathname} = useLocation();
    const isActive = pathname.startsWith(to);

    const closeModal = () => {
        dispatch({
            type: "CLOSE"
        })
    }

    return (
        <div onClick={closeModal} className="group py-1 outline-none flex">
            <Link to={to} className={`${isActive ? 'text-blue-700' : 'text-white' } custom-button flex items-center justify-center gap-4 self-start p-2 text-md font-bold xs:p-3 xl:pr-5 }`}>
                <Icon className="h-7 w-7" />
                <p className="hidden xl:block">{label}</p>
            </Link>
        </div>
    )
}

SideBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

export default SideBarLink