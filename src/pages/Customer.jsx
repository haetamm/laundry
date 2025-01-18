import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Table from "../component/auth/Table";
import { customerColumns } from "../utils/dataColumn";
import HeaderPage from "../component/auth/HeaderPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../store/sliceCustomer";
import { modalCreate } from "../store/sliceModal";

const Customer = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleAddButton = () => {
    dispatch(modalCreate({ url: "customers" }));
  };

  const columns = customerColumns;

  const data = customers
    ? customers.map((customer) => ({
        id: customer.id,
        kode: `${customer.id.slice(0, 6)}...`,
        name: customer.name,
        action: ["update", "delete"],
      }))
    : [];

  return (
    <>
      <Helmet>
        <title>Customer</title>
        <meta name="description" content="Customer page" />
      </Helmet>
      <div className="mt-[60px] mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Customer" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Customer;
