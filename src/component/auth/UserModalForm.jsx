import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerUserFormSchema, userFormSchema } from "../../utils/validation";
import UserForm from "../UserForm";
import { useDispatch, useSelector } from "react-redux";
import { createAdmin, getAdminById, updateAdmin } from "../../store/sliceAdmin";

const UserModalForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);
  const { admin, loading } = useSelector((state) => state.admin);

  const validationSchema = id ? userFormSchema : registerUserFormSchema;

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "",
    },
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (id) {
      dispatch(getAdminById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && admin) {
      form.reset({
        name: admin.name || "",
        username: admin.username || "",
        email: admin.email || "",
        password: "",
        role: admin.role || "",
      });
    }
  }, [admin, form, id]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateAdmin({ ...data, id }));
    } else {
      dispatch(createAdmin(data));
    }
  };

  return (
    <>
      <UserForm
        form={form}
        openEdit={true}
        placeholder={id ? "New Password" : ""}
      />

      <button
        className={`disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 transition-all w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1`}
        disabled={!form.formState.isValid || form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
      >
        {loading ? "Loading" : id ? "Update Admin" : "Create Admin"}
      </button>
    </>
  );
};

export default UserModalForm;
