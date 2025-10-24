import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Table from "../component/auth/Table";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminColumns } from "../utils/dataColumn";
import HeaderPage from "../component/auth/HeaderPage";
import { fetchAdmins } from "../store/sliceAdmin";
import { modalCreate } from "../store/sliceModal";
import CardUser from "../component/auth/CardUser";

const Admin = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const { admins, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const handleAddButton = () => {
    dispatch(modalCreate({ url: "users" }));
  };

  const columns = adminColumns;

  const data = admins
    ? admins.map((admin) => ({
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        action: ["update", "delete"],
      }))
    : [];

  if (role !== "ADMIN") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <Helmet>
        <title>Admin</title>
        <meta name="description" content="Admin page" />
      </Helmet>
      <div className="mt-[75px] xs:mt-0 pb-[90px] xs:pb-0 mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Admin" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
          <CardUser data={data} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Admin;
