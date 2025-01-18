import React from "react";
import { Link, useLocation } from "react-router-dom";
import navbarPartial from "../../styles/component/navbarPartial.module.scss";
import { isActive, menuFields, scrollTop } from "../../utils/helper";

const NavBarPartial = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className={`${navbarPartial.menu} hidden xs:block`}>
        <ul className={`${navbarPartial.mainMenu}`}>
          {menuFields.map(({ path, label }, index) => (
            <li
              key={index}
              onClick={() => {
                scrollTop();
              }}
              className={isActive(pathname, path) ? navbarPartial.active : ""}
            >
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBarPartial;
