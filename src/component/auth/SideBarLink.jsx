import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { scrollTop } from "../../utils/helper";

const SideBarLink = ({ to, icon: Icon, label, isLogout, onLogout }) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);

  const hideOnXL = label === "Logout" ? "xl:hidden" : "";

  const commonClasses = `${
    isActive
      ? "bg-white text-teal-600 shadow-lg transform scale-95 font-semibold border-l-4 border-teal-400"
      : "text-white hover:bg-blue-500/50 hover:scale-102 hover:border-l-4 border-blue-300/50"
  } custom-button flex items-center justify-center gap-4 self-start p-2 text-md font-bold xl:pr-5 rounded-lg transition-all duration-200 xs:justify-center xl:justify-start w-full`;

  return (
    <div className={`group py-1 outline-none flex ${hideOnXL}`}>
      {isLogout ? (
        <button onClick={onLogout} className={commonClasses}>
          <Icon className="h-7 w-7" />
          <p className="hidden xl:block">{label}</p>
        </button>
      ) : (
        <Link
          onClick={() => scrollTop()}
          to={to}
          className={commonClasses}
        >
          <Icon className="h-7 w-7" />
          <p className="hidden xl:block">{label}</p>
        </Link>
      )}
    </div>
  );
};

SideBarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  isLogout: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default SideBarLink;
