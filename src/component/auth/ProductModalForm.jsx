import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "../../utils/validation";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../store/sliceProduct";

const ProductModalForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);
  const { product, loading } = useSelector((state) => state.product);

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      type: "",
    },
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && product) {
      form.reset({
        name: product.name || "",
        price: product.price || "",
        type: product.type || "",
      });
    }
  }, [product, form, id]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateProduct({ ...data, id }));
    }
    {
      dispatch(createProduct(data));
    }
  };

  return (
    <>
      <ProductForm form={form} openEdit={true} />

      <button
        className={` font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-gradient-to-r from-blue-500 to-teal-500 disabled:bg-slate-500 hover:from-blue-400 hover:to-teal-400 transition-all w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
      >
        {loading ? "Loading" : id ? "Update Product" : "Create Product"}
      </button>
    </>
  );
};

export default ProductModalForm;
