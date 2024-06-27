import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/api';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UserForm from '../component/UserForm';
import { toast } from 'sonner';
import HeaderPageDetail from '../component/auth/HeaderPageDetail';
import { userFormSchema } from '../utils/validation';

export const AdminDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { role } = useSelector((state) => state.user)
    const [user, setUser] = useState({})
    const [openEdit, setOpenEdit] = useState(false)

    const form = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            role: ''
        },
        resolver: zodResolver(userFormSchema),
        mode: 'onChange'
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dataResponse } = await axiosInstance.get(`users/${id}`)
                const { data: userData } = dataResponse
                setUser(userData)
                form.reset(userData)
            } catch (e) {
                if (e.response.status === 404) {
                    navigate(`/dashboard/user`)
                    toast.error(e.response.data.status.description)
                }
                console.error('Error fetching users:', e)
            }
        }

        fetchData()
    }, [id, form, navigate])

    const handleEditToggle = () => {
        setOpenEdit(!openEdit)
        form.reset({
            name: user?.name || '',
            username: user?.username || '',
            email: user?.email || '',
            role: user?.role || '',
        })
    }

    const updateUser = async (data) => {
        const userUpdate = {
            ...data,
            id: user.id,
        }
        try {
            const { data: response } = await axiosInstance.put('users/', userUpdate);
            const { data: user } = response
            setUser(user)
            setOpenEdit(false)
            toast.success(`User ${user.name} berhasil diupdate`, { duration: 2000 })
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.status.description)
        }
    }

    if (role !== 'admin') {
        return <Navigate to={'/dashboard'} />
    }

    return (
        <>
            <Helmet>
                <title>{user.name}</title>
                <meta name="description" content="Admin page" />
            </Helmet>
            <div className="mt-[60px] mx-auto mb-6 xs:mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
                <HeaderPageDetail
                    date={user.updatedAt}
                    handleEditToggle={handleEditToggle}
                    openEdit={openEdit}
                />
                <div className="mt-5">     
                    <UserForm form={form} openEdit={openEdit} />
                    
                    {openEdit && (
                        <button
                            className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                            onClick={form.handleSubmit(updateUser)}
                        >
                            Update
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};
