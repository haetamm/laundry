import React, { useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import PasswordToggleIcon from "./PasswordToggleIcon";
import { rolesData } from "../utils/dataColumn";
import { FaUserTag } from "react-icons/fa";
import { fieldsUser } from "../utils/fields";

const UserForm = ({ form, openEdit, auth = true, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const roles = rolesData;

  return (
    <form className={`${auth ? "mt-5" : "mt-0"} text-black gap-5`}>
      {fieldsUser.map(({ name, label, type, icon }) => (
        <Controller
          key={name}
          name={name}
          control={form.control}
          render={({ field, fieldState }) => (
            <FormInput
              label={label}
              type={
                name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              name={name}
              {...field}
              fieldState={fieldState}
              auth={auth}
              openEdit={openEdit}
              placeholder={placeholder || label}
            >
              {auth ? <div>{label}</div> : icon}

              {name === "password" && !auth && (
                <PasswordToggleIcon
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                />
              )}
            </FormInput>
          )}
        />
      ))}

      <Controller
        name="role"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <label
              className={`${
                auth
                  ? "border-black text-black"
                  : "border-white text-white py-3"
              }  border-2 mb-2 p-1 flex items-center gap-1`}
            >
              {auth ? (
                <div
                  className={`${
                    auth ? "w-[112px] bg-slate-200 flex py-2" : "bg-blue-400"
                  } px-2 py-1 text-text-white flex`}
                >
                  Role
                </div>
              ) : (
                <FaUserTag className="w-6 h-6 mr-1" />
              )}
              <select
                className={`${
                  auth ? "text-black" : "text-white"
                } w-full outline-none cursor-pointer bg-transparent`}
                {...field}
                disabled={!openEdit}
              >
                <option className="text-md text-black" value="">
                  Select Role
                </option>
                {roles.map((role) => (
                  <option
                    className="text-md text-black"
                    key={role.id}
                    value={role.key}
                  >
                    {role.key}
                  </option>
                ))}
              </select>
            </label>
            {fieldState.error && (
              <p
                className={`${auth ? "text-black" : "text-white"} text-sm ml-1`}
              >
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </form>
  );
};

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  openEdit: PropTypes.bool.isRequired,
  auth: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default UserForm;
