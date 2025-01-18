import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { scrollTop } from "../../utils/helper";

const SideBarLink = ({ to, icon: Icon, label }) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);

  return (
    <div className="group py-1 outline-none flex">
      <Link
        onClick={() => {
          scrollTop();
        }}
        to={to}
        className={`${
          isActive ? "text-blue-700" : "text-white"
        } custom-button flex items-center justify-center gap-4 self-start p-2 text-md font-bold xs:p-3 xl:pr-5 }`}
      >
        <Icon className="h-7 w-7" />
        <p className="hidden xl:block">{label}</p>
      </Link>
    </div>
  );
};

SideBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
};

export default SideBarLink;
