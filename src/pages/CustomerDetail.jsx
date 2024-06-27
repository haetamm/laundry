import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/api'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import CustomerForm from '../component/auth/CustomerForm'
import HeaderPageDetail from '../component/auth/HeaderPageDetail'
import { customerFormSchema } from '../utils/validation'

export const CustomerDetail = () => {
    const navigate = useNavigate()
    const { customerId } = useParams()
    const [customer, setCustomer] = useState({})
    const [openEdit, setOpenEdit] = useState(false)

    const form = useForm({
        defaultValues: {
            name: '',
            phoneNumber: '',
            address: ''
        },
        resolver: zodResolver(customerFormSchema),
        mode: 'onChange'
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: response} = await axiosInstance.get(`customers/${customerId}`)
                const { data: customer } = response
                setCustomer(customer)
                form.reset(customer)
            } catch (e) {
                if (e.response.status === 404) {
                    navigate(`/dashboard/customer`)
                    toast.error(e.response.data.status.description)
                }
                console.error('Error fetching customers:', e)
            }
        }

        fetchData()
    }, [form, navigate, customerId])

    const handleEditToggle = () => {
        setOpenEdit(!openEdit);
        form.reset({
            name: customer?.name || '',
            phoneNumber: customer?.phoneNumber || '',
            address: customer?.address || ''
        })
    }

    const updateCustomer = async (data) => {
        const customerUpdate = {
            ...data,
            id: customer.id,
        }
        try {
            const { data: response } = await axiosInstance.put('customers/', customerUpdate);
            const { data: customer } = response
            setCustomer(customer)
            setOpenEdit(false);
            toast.success(`Customer an. ${customer.name} berhasil diupdate`, { duration: 2000 });
        } catch (e) {
            console.error(e);
            toast.error(e.response.data.status.description)
        }
    }

    return (
        <>
            <Helmet>
                <title>{customer.name}</title>
                <meta name="description" content="Admin page" />
            </Helmet>
            <div className="mt-[60px] mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen items-center px-2">
                <HeaderPageDetail
                    date={customer.updatedAt}
                    handleEditToggle={handleEditToggle}
                    openEdit={openEdit}
                />
                <div className="mt-5">
                    <CustomerForm form={form} openEdit={openEdit} />
                    {openEdit && (
                        <button
                            className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                            onClick={form.handleSubmit(updateCustomer)}
                        >
                            Update Customer
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
