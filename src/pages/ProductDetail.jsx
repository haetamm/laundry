import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Helmet } from 'react-helmet-async'
import ProductForm from '../component/auth/ProductForm'
import HeaderPageDetail from '../component/auth/HeaderPageDetail'
import { productFormSchema } from '../utils/validation'

export const ProductDetail = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [openEdit, setOpenEdit] = useState(false)

    const form = useForm({
        defaultValues: {
            name: '',
            price: '',
            type: ''
        },
        resolver: zodResolver(productFormSchema),
        mode: 'onChange'
    })
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: response} = await axiosInstance.get(`products/${productId}`);
                const { data: product } = response
                setProduct(product)
                form.reset(product)
            } catch (e) {
                if (e.response.status === 404) {
                    navigate(`/dashboard/product`)
                    toast.error(e.response.data.status.description)
                }
                console.error('Error fetching products:', e)
            }
        }

        fetchData()
    }, [form, navigate, productId])

    const handleEditToggle = () => {
        setOpenEdit(!openEdit)
        form.reset({
            name: product?.name || '',
            price: product?.price || '',
            type: product?.type || ''
        })
    }

    const updateProduct = async (data) => {
        const productUpdate = {
            ...data,
            id: product.id,
        }
        try {
            const { data: response } = await axiosInstance.put('products/', productUpdate);
            const { data: product } = response
            setProduct(product)
            setOpenEdit(false)
            toast.success(`product ${product.name} berhasil diupdate`, {duration: 2000})
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.status.description)
        }
    }

    return (
        <>
            <Helmet>
                <title>{product.name}</title>
                <meta name="description" content="Admin page" />
            </Helmet>
            <div className="mt-[60px] mx-auto mb-6 xs:mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
                <HeaderPageDetail
                    date={product.updatedAt}
                    handleEditToggle={handleEditToggle}
                    openEdit={openEdit}
                />

                <div className="mt-5">     
                    <ProductForm form={form} openEdit={openEdit} />
                    
                    {openEdit && (
                        <button
                            className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
                            disabled={!form.formState.isValid || form.formState.isSubmitting}
                            onClick={form.handleSubmit(updateProduct)}
                        >
                            Update Product
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
