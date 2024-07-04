import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { productFormSchema } from '../../utils/validation'
import axiosInstance from '../../utils/api'
import ProductForm from './ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const ProductModalForm = () => {
    const dispatch = useDispatch()
    const { fetch } = useSelector((state) => state.modal)

    const form = useForm({
        defaultValues: {
            name: '',
            price: '',
            type: ''
        },
        resolver: zodResolver(productFormSchema),
        mode: 'onChange'
    })

    const createProduct = async (data) => {
        try {
            const { data: response } = await axiosInstance.post('products', data)
            const { data: product } = response
            dispatch({
                type: "CLOSE"
            })
            fetch()
            toast.success(`product ${product.name} berhasil ditambahkan`, {duration: 2000})
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.message)
        }
    }

    return (
        <>
            <ProductForm form={form} openEdit={true} />
                    
            <button
                className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
                disabled={!form.formState.isValid || form.formState.isSubmitting}
                onClick={form.handleSubmit(createProduct)}
            >
                Create Product
            </button>
        </>
    )
}

export default ProductModalForm