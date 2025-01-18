import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const FormInput = forwardRef(
  (
    {
      label,
      type,
      name,
      value,
      onChange,
      children,
      fieldState,
      auth = false,
      openEdit = true,
      placeholder,
    },
    ref
  ) => {
    return (
      <>
        <label
          className={`${
            auth ? "border-black text-black" : "border-white text-white"
          }  border-2 mb-2 p-1 flex items-center gap-1`}
        >
          <div
            className={`${auth ? "w-[112px] bg-slate-200 px-2 py-1 flex" : ""}`}
          >
            {children}
          </div>
          <input
            autoComplete={type === "password" ? "current-password" : "off"}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            ref={ref}
            className={`${
              auth ? " text-black" : "placeholder:text-white text-white"
            } bg-transparent w-full p-2 outline-none `}
            placeholder={placeholder || label}
            disabled={!openEdit}
          />
        </label>
        {fieldState.error?.message && (
          <p
            className={`${
              auth ? "text-black" : "text-white"
            } mb-2 text-sm ml-1`}
          >
            {fieldState.error.message}
          </p>
        )}
      </>
    );
  }
);

FormInput.displayName = "FormInput";

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  fieldState: PropTypes.object,
  auth: PropTypes.bool,
  openEdit: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default FormInput;
