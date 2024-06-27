import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoIosMail } from 'react-icons/io'
import PasswordToggleIcon from '../PasswordToggleIcon'
import FormInput from '../FormInput'
import guestStyle from '../../styles/pages/LoginPage.module.scss'
import { loginFormSchema } from '../../utils/validation'
import { Link } from 'react-router-dom'


const LoginForm = ({ onSubmit, loading, welcome }) => {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange'
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-white">
            {loading ? (
                <h1 className={`${guestStyle.title} font-semibold `}>
                    {welcome ? 'Welcome' : 'Loading..'}
                </h1>
            ) : (
                <>
                    <Controller
                        name="username"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormInput
                                label="Username"
                                type="text"
                                name="username"
                                {...field}
                                fieldState={fieldState}
                            >
                                <IoIosMail className="w-6 h-6" />
                            </FormInput>
                        )}
                    />
                                
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormInput
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                {...field}
                                fieldState={fieldState}
                            >
                                <PasswordToggleIcon showPassword={showPassword} toggleShowPassword={toggleShowPassword} />
                            </FormInput>
                        )}
                    />
                                
                    <button
                        className={`${guestStyle.btn} disabled:bg-slate-300 font-bold disabled:cursor-not-allowed bg-slate-600 hover:bg-slate-700`}
                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                    >
                        Login
                    </button>
                    <div className="flex justify-center mt-1 text-white">Don&apos;t have an account? <Link to={'/guest/register'} className="hover:text-red-400 ml-1"> register</Link></div>
                </>
            )}
        </form>
    )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  welcome: PropTypes.bool.isRequired
}

export default LoginForm;
