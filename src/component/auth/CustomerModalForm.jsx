import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { customerFormSchema } from '../../utils/validation'
import axiosInstance from '../../utils/api'
import CustomerForm from './CustomerForm'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const CustomerModalForm = () => {
    const dispatch = useDispatch()
    const { fetch } = useSelector((state) => state.modal)

    const form = useForm({
        defaultValues: {
            name: '',
            phoneNumber: '',
            address: ''
        },
        resolver: zodResolver(customerFormSchema),
        mode: 'onChange'
    })

    const createCustomer = async (data) => {
        try {
            const { data: response } = await axiosInstance.post('customers/', data)
            const { data: customer } = response
            dispatch({
                type: "CLOSE"
            })
            fetch()
            toast.success(`customer an. ${customer.name} berhasil ditambahkan`, {duration: 2000})
        } catch (e) {
            console.error(e)
            toast.error(e.response.data.status.description)
        }
    }

    return (
        <>
            <CustomerForm form={form} openEdit={true} />
                    
            <button
                className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                onClick={form.handleSubmit(createCustomer)}
            >
                Create Customer
            </button>
        </>
    )
}

export default CustomerModalForm