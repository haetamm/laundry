import React from "react";
import SideBarLink from "./SideBarLink";
import { useDispatch, useSelector } from "react-redux";
import { sidebarItemLink } from "../../utils/fields";
import { modalLogout } from "../../store/sliceModal";

const SideBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const links = sidebarItemLink(user.role);

  const handleLogout = () => {
    dispatch(modalLogout());
  };

  return (
    <>
      <div className="flex w-0 shrink-0 xs:w-20 md:w-24 lg:max-w-none xl:-mr-0 xl:w-full xl:max-w-[18rem]">
        <div className="fixed bottom-0 z-10 flex w-full flex-col justify-between xs:justify-center xl:justify-normal bg-main-background py-0 xs:top-0 xs:h-full xs:w-auto xs:border-0 bg-black xs:px-2 xs:py-3 xs:pt-2  xl:w-[16rem]">
          <div className="flex flex-col mt-0 tab:mt-12 text-lg justify-center gap-2 xs:gap-0 xl:gap-2 xs:items-center xl:items-stretch">
            <div className="flex items-center justify-around xs:flex-col xs:justify-center xl:block text-md">
              {links.map(({ to, icon, label }) => (
                <SideBarLink key={to} to={to} icon={icon} label={label} />
              ))}
            </div>

            <div
              className="cursor-pointer xl:mt-10 text-lg font-bold text-white hover:brightness-90 xs:static hidden xl:block  xl:bg-blue-700  rounded-full p-2 xl:w-11/12"
              type="button"
            >
              <p onClick={handleLogout} className="hidden xl:block text-center">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
