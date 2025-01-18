import React from "react";
import PropTypes from "prop-types";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const PasswordToggleIcon = ({ showPassword, toggleShowPassword }) => (
  <div onClick={toggleShowPassword}>
    {showPassword ? (
      <IoIosEye className="w-6 h-6 cursor-pointer" />
    ) : (
      <IoIosEyeOff className="w-6 h-6 cursor-pointer" />
    )}
  </div>
);

PasswordToggleIcon.propTypes = {
  showPassword: PropTypes.bool,
  toggleShowPassword: PropTypes.func,
};

export default PasswordToggleIcon;
