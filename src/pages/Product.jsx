import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Table from "../component/auth/Table";
import { productColumns } from "../utils/dataColumn";
import HeaderPage from "../component/auth/HeaderPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/sliceProduct";
import { modalCreate } from "../store/sliceModal";
import CardProduct from "../component/auth/CardProduct";

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddButton = () => {
    dispatch(modalCreate({ url: "products" }));
  };

  const columns = productColumns;

  const data = products
    ? products.map((product) => ({
        id: product.id,
        kode: `${product.id.slice(0, 6)}...`,
        name: product.name,
        price: product.price,
        action: ["update", "delete"],
      }))
    : [];

  return (
    <>
      <Helmet>
        <title>Product</title>
        <meta name="description" content="Product page" />
      </Helmet>
      <div className="mt-[75px] xs:mt-0 pb-[90px] xs:pb-0 mx-auto mb-0 xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Product" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
          <CardProduct data={data} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Product;
