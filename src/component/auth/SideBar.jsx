import React from 'react'
import SideBarLink from './SideBarLink';
import { FaUsersLine } from 'react-icons/fa6';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdminPanelSettings } from 'react-icons/md';
import { PiFilesFill } from 'react-icons/pi';

const SideBar = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.user);

    const logout = () => {
        dispatch({
            type: "MODAL_LOGOUT"
        })
    }

    return (
        <>
            <div className="flex w-0 shrink-0 xs:w-20 md:w-24 lg:max-w-none xl:-mr-0 xl:w-full xl:max-w-[18rem]">
                <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between xs:justify-center xl:justify-normal bg-main-background py-0 xs:top-0 xs:h-full xs:w-auto xs:border-0 bg-black xs:px-2 xs:py-3 xs:pt-2  xl:w-[16rem]">
                    <div className="flex flex-col mt-0 tab:mt-12 text-lg justify-center gap-2 xs:gap-0 xl:gap-2 xs:items-center xl:items-stretch">
                        <div className="flex items-center justify-around xs:flex-col xs:justify-center xl:block text-md">
                            <SideBarLink to="/dashboard/transaction" icon={PiFilesFill} label="Transaction" />
                            <SideBarLink to="/dashboard/customer" icon={FaUsersLine} label="Customer" />
                            <SideBarLink to="/dashboard/product" icon={GiCardboardBoxClosed} label="Product" />
                            {user.role === 'admin' && 
                                <SideBarLink to="/dashboard/user" icon={MdAdminPanelSettings} label="Administrator" />
                            }
                        </div>

                        <div className="cursor-pointer xl:mt-10 text-lg font-bold text-white hover:brightness-90 xs:static hidden xl:block  xl:bg-blue-700  rounded-full p-2 xl:w-11/12" type="button">
                            <p onClick={logout} className="hidden xl:block text-center">Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar