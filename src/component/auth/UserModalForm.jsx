import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUserFormSchema } from '../../utils/validation'
import axiosInstance from '../../utils/api'
import UserForm from '../UserForm'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const UserModalForm = () => {
    const dispatch = useDispatch()
    const { fetch } = useSelector((state) => state.modal)

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
            const { data: response } = await axiosInstance.post('users', data);
            const { data: user } = response
            dispatch({
                type: "CLOSE"
            })
            fetch()
            toast.success(`user ${user.name} berhasil ditambahkan`, { duration: 2000 })
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.status.description)
        }
    }

    return (
        <>
            <UserForm form={form} openEdit={true} />
                    
            <button
                className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                onClick={form.handleSubmit(createUser)}
            >
                Create Admin
            </button>
        </>
    )
}

export default UserModalForm