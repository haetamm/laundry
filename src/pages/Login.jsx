import React from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../component/guest/LoginForm";

import guestStyle from "../styles/pages/LoginPage.module.scss";
import { loginUser } from "../store/sliceLogin";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.login);

  const handleLogin = async (data) => {
    dispatch(loginUser(data));
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className={`${guestStyle.loginPage}`}>
        <div className={`${guestStyle.form}`}>
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            welcome={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
