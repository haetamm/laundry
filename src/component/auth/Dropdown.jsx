import React, { useState } from 'react'
import { GoTriangleUp } from 'react-icons/go'
import { IoMdLogOut } from 'react-icons/io'
import { useDispatch } from 'react-redux'

import '../../styles/component/navbar.scss'

const Dropdown = () => {
    const dispatch = useDispatch()
    const [openDropdown, setOpenDropdown] = useState(false)
    const handleDropdownToggle = () => {
        setOpenDropdown(!openDropdown)
    }

    const logout = () => {
        dispatch({
            type: "MODAL_LOGOUT",
        })
    }
    
    return (
        <div>
            <div onClick={handleDropdownToggle} className={`${openDropdown ? 'text-blue-400' : '' } flex items-center space-x-2 cursor-pointer`}>
                <div className="items-center text-end ">
                    <p className='text-lg hidden md:inline-block'>Tarak Company</p>
                </div>
                <GoTriangleUp className={`${openDropdown ? '' : 'rotate-180'}`} />
            </div>
            <div className="dropdown-container">
                {openDropdown &&
                    <ul className="dropdown-list text-lg ">
                        <li onClick={logout} className="dropdown-list-item flex items-center space-x-2">
                            <IoMdLogOut />
                            <div>Logout</div>
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default Dropdown