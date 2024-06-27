import React from 'react'
import { Helmet } from 'react-helmet-async'
import UserForm from '../component/UserForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axiosInstance from '../utils/api'
import { registerUserFormSchema } from '../utils/validation'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

import guestStyle from '../styles/pages/LoginPage.module.scss'

const Register = () => {
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            role: ''
        },
        resolver: zodResolver(registerUserFormSchema),
        mode: 'onChange'
    })

    const createUser = async (data) => {
        try {
            const { data: dataResponse } = await axiosInstance.post('auth/register', data);
            const { data: user } = dataResponse
            navigate(`/guest/login`)
            toast.success(`silahkan login ${user.name} :) `)
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.status.description)
        }
    }

    return (
        <>
            <Helmet>
                <title>Register</title>
                <meta name="description" content="Register page" />
            </Helmet>
            <div className={`${guestStyle.loginPage}`}>
                <div className={`${guestStyle.form}`}>
                    <UserForm form={form} openEdit={true} auth={false} />
                    <button
                        onClick={form.handleSubmit(createUser)}
                        className={`${guestStyle.btn} disabled:bg-slate-300 mt-2 font-bold disabled:cursor-not-allowed bg-slate-600 hover:bg-slate-700`}
                        disabled={!form.formState.isValid || form.formState.isSubmitting}>
                        Register
                    </button>
                    <div className="flex justify-center mt-1 text-white">Have an account already? <Link to={'/guest/login'} className="hover:text-red-400 ml-1"> login</Link></div>
                </div>
            </div>

        </>
    )
}

export default Register