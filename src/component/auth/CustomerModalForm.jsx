import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { customerFormSchema } from "../../utils/validation";
import CustomerForm from "./CustomerForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../../store/sliceCustomer";

const CustomerModalForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);
  const { customer, loading } = useSelector((state) => state.customer);

  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
    resolver: zodResolver(customerFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (id) {
      dispatch(getCustomerById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && customer) {
      form.reset({
        name: customer.name || "",
        phoneNumber: customer.phoneNumber || "",
        address: customer.address || "",
      });
    }
  }, [customer, form, id]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateCustomer({ ...data, id }));
    } else {
      dispatch(createCustomer(data));
    }
  };

  return (
    <>
      <CustomerForm form={form} openEdit={true} />

      <button
        className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
      >
        {loading ? "Loading" : id ? "Update Customer" : "Create Customer"}
      </button>
    </>
  );
};

export default CustomerModalForm;
