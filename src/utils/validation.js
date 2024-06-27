import { z } from "zod";

export const loginFormSchema = z.object({
    username: z.string().trim().min(1, 'username is required'),
    password: z.string().trim().min(1, 'password is required')
})

export const registerUserFormSchema = z.object({
    name: z.string().trim().min(1, 'name is required'),
    username: z.string().trim().min(1, 'username is required'),
    email: z.string().trim().email(),
    password: z.string().trim().min(4),
    role: z.string().min(1, 'role is required')
})

export const userFormSchema = z.object({
    name: z.string().trim().min(1, 'name is required'),
    username: z.string().trim().min(1, 'username is required'),
    email: z.string().trim().email(),
    role: z.string().min(1, 'role is required')
})

export const customerFormSchema = z.object({
    name: z.string().trim().min(1, 'name is required'),
    phoneNumber: z.string().min(1, 'phone is required'),
    address: z.string().trim().min(1, 'address is required')
})

export const productFormSchema = z.object({
    name: z.string().trim().min(1, 'name is required'),
    price: z.preprocess((value) => parseFloat(value), z.number().min(1, 'price is required')),
    type: z.string().trim().min(1, 'type is required'),
})

export const transactionSchema = z.object({
    customerId: z.string().nonempty('Customer is required'),
    billDetails: z.array(
        z.object({
            product: z.object({
                id: z.string().nonempty('Product is required')
            }),
            qty: z.preprocess((value) => parseInt(value, 10), z.number().min(1, 'Quantity must be at least 1')),
        })
    ).min(1, 'At least one product is required')
})