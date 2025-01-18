import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import FormInput from "../FormInput";
import { fieldsProduct } from "../../utils/fields";

const ProductForm = ({ form, openEdit }) => {
  return (
    <form className="text-black gap-5 mt-5">
      {fieldsProduct.map(({ name, label, type }) => (
        <Controller
          key={name}
          name={name}
          control={form.control}
          render={({ field, fieldState }) => (
            <FormInput
              label={label}
              type={type}
              name={name}
              {...field}
              fieldState={fieldState}
              auth={true}
              openEdit={openEdit}
            >
              <div>{label}</div>
            </FormInput>
          )}
        />
      ))}
    </form>
  );
};

ProductForm.propTypes = {
  form: PropTypes.object.isRequired,
  openEdit: PropTypes.bool.isRequired,
};

export default ProductForm;
