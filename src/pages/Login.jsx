import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Cookies from "js-cookie"
import axiosInstance from '../utils/api'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import LoginForm from '../component/guest/LoginForm'

import guestStyle from '../styles/pages/LoginPage.module.scss'

const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [welcome, setWelcome] = useState(false)

  const loginUser = async (data) => {
    try {
      setLoading(true)
      const response = await axiosInstance.post('auth/login', data)
      const token = response.data.data.token
      const decodedToken = jwtDecode(token)

      dispatch({
        type: "LOGIN",
        payload: {
          userId: decodedToken.userId,
          role: decodedToken.role,
          token: token
        }
      })

      Cookies.set("token", token)
      toast.success(`selamat bekerja ${decodedToken.role}`)
      
      setWelcome(true)

      setTimeout(() => {
        setLoading(false)
      }, 3000);
    } catch (e) {
      if (e.response.status === 400) {
        toast.error(e.response.data.message)
      }
      setLoading(false)
    } finally {
      setLoading(false)
      setWelcome(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className={`${guestStyle.loginPage}`}>
        <div className={`${guestStyle.form}`}>
          <LoginForm onSubmit={loginUser} loading={loading} welcome={welcome} />
        </div>
      </div>
    </>
  )
}

export default Login