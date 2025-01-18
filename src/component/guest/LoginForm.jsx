import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordToggleIcon from "../PasswordToggleIcon";
import FormInput from "../FormInput";
import guestStyle from "../../styles/pages/LoginPage.module.scss";
import { loginFormSchema } from "../../utils/validation";
import { fields } from "../../utils/fields";

const LoginForm = ({ onSubmit, loading, welcome }) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="text-white">
      {loading ? (
        <h1 className={`${guestStyle.title} font-semibold `}>
          {welcome ? "Welcome" : "Loading.."}
        </h1>
      ) : (
        <>
          {fields.map(({ name, label, type, icon }) => (
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
                >
                  {name === "password" ? (
                    <PasswordToggleIcon
                      showPassword={showPassword}
                      toggleShowPassword={toggleShowPassword}
                    />
                  ) : (
                    icon
                  )}
                </FormInput>
              )}
            />
          ))}

          <button
            className={`${guestStyle.btn} disabled:bg-slate-300 font-bold disabled:cursor-not-allowed bg-slate-600 hover:bg-slate-700`}
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Login
          </button>
        </>
      )}
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  welcome: PropTypes.bool.isRequired,
};

export default LoginForm;
