import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../../store/sliceTransaction";
import { fetchProducts } from "../../store/sliceProduct";
import { fetchCustomers } from "../../store/sliceCustomer";

const TransactionModalForm = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { customers } = useSelector((state) => state.customer);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      customerId: "",
      billDetails: [{ product: { id: "" }, qty: 1 }],
    },
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const calculateTotalPrice = () => {
    const billDetails = watch("billDetails");
    let total = 0;
    if (products.length > 0) {
      billDetails.forEach((item) => {
        const product = products.find((prod) => prod.id === item.product.id);
        if (product) {
          total += product.price * item.qty;
        }
      });
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  });

  const onSubmit = async (data) => {
    dispatch(createTransaction(data));
  };

  const billDetails = watch("billDetails");

  const addProduct = () => {
    setValue("billDetails", [...billDetails, { product: { id: "" }, qty: 1 }]);
  };

  const removeProduct = (index) => {
    setValue(
      "billDetails",
      billDetails.filter((_, i) => i !== index)
    );
  };

  const getAvailableProducts = (currentIndex) => {
    const selectedProductIds = billDetails.map((item, index) =>
      index !== currentIndex ? item.product.id : null
    );
    return products.filter(
      (product) => !selectedProductIds.includes(product.id)
    );
  };

  return (
    <form className="mt-5 text-black" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="customerId"
        control={control}
        render={({ field }) => (
          <label
            className={`border-black border-2 text-blackborder-2 mb-5 p-1 flex items-center gap-1`}
          >
            <div className={`w-[112px] bg-slate-200 px-2 py-1 flex`}>
              Customer
            </div>
            <select
              className=" w-full outline-none text-black p-2 cursor-pointer"
              {...field}
            >
              <option className="text-md" value="">
                Select Customer
              </option>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <option
                    className="text-md"
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                ))
              ) : (
                <option className="text-md" value="">
                  Data not available
                </option>
              )}
            </select>
          </label>
        )}
      />
      {errors.customerId && (
        <div className="text-red-500 text-sm">{errors.customerId.message}</div>
      )}

      {billDetails.map((item, index) => (
        <div key={index} className="mb-2">
          <Controller
            name={`billDetails.${index}.product.id`}
            control={control}
            render={({ field }) => (
              <label
                className={`border-black border-2 text-blackborder-2 mb-2 p-1 flex items-center gap-1`}
              >
                <div className={`w-[112px] bg-slate-200 px-2 py-1 flex`}>
                  Product
                </div>
                <select
                  className=" w-full outline-none text-black p-2 cursor-pointer"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    calculateTotalPrice();
                  }}
                >
                  <option className="text-md" value="">
                    Select Product
                  </option>
                  {getAvailableProducts(index).length > 0 ? (
                    getAvailableProducts(index).map((product) => (
                      <option
                        className="text-md"
                        key={product.id}
                        value={product.id}
                      >
                        {product.name}
                      </option>
                    ))
                  ) : (
                    <option className="text-md" value="">
                      Data not available
                    </option>
                  )}
                </select>
              </label>
            )}
          />
          {errors.billDetails && errors.billDetails[index] && (
            <div className="text-red-500 text-sm">
              {errors.billDetails[index].product?.id?.message}
            </div>
          )}

          <Controller
            name={`billDetails.${index}.qty`}
            control={control}
            render={({ field }) => (
              <label
                className={`border-black border-2 text-blackborder-2 mb-2 p-1 flex items-center gap-1`}
              >
                <div className={`w-[112px] bg-slate-200 px-2 py-1 flex`}>
                  Qty
                </div>
                <input
                  type="number"
                  className="text-black bg-transparent w-full p-2 outline-none placeholder:text-black"
                  placeholder="Qty"
                  {...field}
                  min="1"
                  onChange={(e) => {
                    field.onChange(e);
                    calculateTotalPrice();
                  }}
                />
              </label>
            )}
          />
          {errors.billDetails && errors.billDetails[index] && (
            <div className="text-red-500 text-sm">
              {errors.billDetails[index].qty?.message}
            </div>
          )}

          {index > 0 && (
            <button
              type="button"
              onClick={() => removeProduct(index)}
              className="text-red-500"
            >
              Remove Product
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addProduct}
        className="text-white bg-black border-2 p-2 mb-2 w-full hover:bg-slate-700 border-slate-200"
      >
        Add Another Product
      </button>
      <div className="mb-2">
        <label
          className={`border-black border-2 text-blackborder-2 mb-2 p-1 flex items-center gap-1`}
        >
          <div className={`w-[112px] bg-slate-200 px-2 py-1 flex`}>Total</div>
          <input
            type="text"
            className="text-black w-full p-2 outline-none placeholder:text-black disabled:bg-white"
            value={totalPrice}
            disabled
          />
        </label>
      </div>
      <button
        type="submit"
        className="disabled:bg-slate-300 font-bold disabled:cursor-not-allowed justify-center text-white text-lg bg-black w-full hover:bg-slate-700 border-2 mb-2 p-3 flex items-center gap-1"
      >
        Create Transaction
      </button>
    </form>
  );
};

export default TransactionModalForm;
