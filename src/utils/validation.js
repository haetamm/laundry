import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().trim().min(1, "username is required"),
  password: z.string().trim().min(1, "password is required"),
});

export const registerUserFormSchema = z.object({
  name: z.string().trim().max(100).min(3),
  username: z
    .string()
    .trim()
    .max(10)
    .regex(/^[a-zA-Z0-9]+$/)
    .min(4),
  email: z.string().trim().email().max(30),
  password: z.string().trim().min(8).max(100),
  role: z.string().min(1, "role is required"),
});

export const userFormSchema = z.object({
  name: z.string().trim().max(100).min(3),
  username: z
    .string()
    .trim()
    .max(10)
    .regex(/^[a-zA-Z0-9]+$/)
    .min(4),
  email: z.string().trim().email().max(30),
  password: z.string().trim().min(6).max(100).optional().or(z.literal("")),
  role: z.string().min(1, "role is required"),
});

export const customerFormSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(100),
  phoneNumber: z.string().min(1, "phone is required").max(20),
  address: z.string().trim().min(1, "address is required").max(225),
});

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(100),
  price: z.preprocess(
    (value) => parseFloat(value),
    z.number().min(1, "price is required")
  ),
  type: z.string().trim().min(1, "type is required").max(10),
});

export const transactionSchema = z.object({
  customerId: z.string().nonempty("Customer is required"),
  billDetails: z
    .array(
      z.object({
        product: z.object({
          id: z.string().nonempty("Product is required"),
        }),
        qty: z.preprocess(
          (value) => parseInt(value, 10),
          z.number().min(1, "Quantity must be at least 1")
        ),
      })
    )
    .min(1, "At least one product is required"),
});
