import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Table from "../component/auth/Table";
import { transactionColumns } from "../utils/dataColumn";
import { useDispatch, useSelector } from "react-redux";
import HeaderPage from "../component/auth/HeaderPage";
import { fetchTransactions } from "../store/sliceTransaction";
import { modalCreate } from "../store/sliceModal";
import CardTransaction from "../component/auth/CardTransaction";

const Transaction = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const columns = transactionColumns;

  const data = transactions
    ? transactions.map((transaction) => ({
        id: transaction.id,
        kode: `${transaction.id.slice(0, 6)}...`,
        customer: transaction.customer.name,
        product: transaction.billDetails.length,
        action: ["detail"],
      }))
    : [];

  const handleAddButton = () => {
    dispatch(modalCreate({ url: "transactions" }));
  };

  return (
    <>
      <Helmet>
        <title>Transaction</title>
        <meta name="description" content="Transaction page" />
      </Helmet>
      <div className="mt-[75px] xs:mt-0 pb-[90px] xs:pb-0 mx-auto xs:ml-[70px] xl:ml-[16rem] h-screen overflow-auto items-center px-2">
        <HeaderPage title="Transaction" handleAddButton={handleAddButton} />
        <div className="mt-5">
          <Table columns={columns} data={data} loading={loading} />
          <CardTransaction data={data} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Transaction;
