import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TransactionPartial from "../component/auth/TransactionPartial";
import { FormattedDate, calculateTotalPrice, formatNum } from "../utils/helper";
import { GiClothesline } from "react-icons/gi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionById } from "../store/sliceTransaction";
import TransactionNotfound from "../component/auth/TransactionNotfound";
import { coloumnName } from "../utils/fields";

export const TransactionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { transaction, error, loading } = useSelector(
    (state) => state.transaction
  );
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getTransactionById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (transaction && transaction.customer) {
      setName(transaction.customer.name);
    }
  }, [transaction]);

  const transactionDetails = [
    { label: "Date", value: FormattedDate(transaction?.billDate) },
    { label: "Kode", value: transaction?.id },
    { label: "Admin", value: transaction?.user?.name },
  ];

  const customerDetails = [
    { label: "Name", value: transaction?.customer?.name },
    { label: "Address", value: transaction?.customer?.address },
    { label: "Phone", value: transaction?.customer?.phoneNumber },
  ];

  if (loading) {
    return (
      <div className="w-screen  h-[calc(100vh-180px)] xs:max-h-[calc(100vh-70px)] md:max-h-[calc(100vh-170px)] flex justify-center items-center xs:mt-14">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3">Loading data...</span>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return <TransactionNotfound />;
  }

  return (
    <>
      <Helmet>
        <title>{`Transaction An. ${name}`}</title>
        <meta name="description" content="Detail Transaction page" />
      </Helmet>
      <div className=" mx-auto mb-[3.5rem] xs:mb-0 xs:ml-[70px] xl:ml-[16rem] overflow-auto items-center">
        <div className="bg-white rounded-lg px-3 md:px-8 mx-auto py-5 max-w-4xl ">
          <div className="flex justify-end md:mb-0">
            <FaArrowLeftLong
              onClick={() => navigate(-1)}
              className="h-8 w-8 cursor-pointer hover:text-blue-600"
            />
          </div>
          <div className="flex items-center justify-between mb-8 gap-2">
            <div className="hidden xs:flex items-center">
              <GiClothesline className="h-[3rem] w-[3rem] xs:h-[5rem] xs:w-[5rem] mr-2" />
              <div className="text-gray-700 font-semibold text-3xl ">
                Tarak Company
              </div>
            </div>
            <div className="text-gray-700">
              <div className="font-bold text-xl mb-2">INVOICE</div>
              {transactionDetails.map((data, index) => (
                <TransactionPartial
                  key={index}
                  label={data.label}
                  type="text"
                  className="text-sm"
                  value={data.value}
                >
                  {data.label}
                </TransactionPartial>
              ))}
            </div>
          </div>
          <div className="border-b-2 border-gray-300 pb-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Customer:</h2>
            {customerDetails.map((data, index) => (
              <div key={index} className="text-gray-700 mb-2">
                {data.label}: {data.value}
              </div>
            ))}
          </div>
          <table className="w-full text-left mb-8">
            <thead>
              <tr>
                {coloumnName.map((data, index) => (
                  <th
                    key={index}
                    className="text-gray-700 font-bold uppercase py-2"
                  >
                    {data.value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transaction.billDetails.map((detail) => (
                <tr key={detail.id}>
                  <td className="py-4 text-gray-700">{detail.product.name}</td>
                  <td className="py-4 text-gray-700">
                    {detail.qty} {detail.product.type}
                  </td>
                  <td className="py-4 text-gray-700">
                    {formatNum(detail.price)}
                  </td>
                  <td className="py-4 text-gray-700">
                    {formatNum(detail.qty * detail.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end items-center mb-8">
            <div className="text-gray-700 mr-2">Total Bayar:</div>
            <div className="text-gray-700 font-bold text-xl">
              {formatNum(calculateTotalPrice(transaction.billDetails))}
            </div>
          </div>
          <div className="border-t-2 border-gray-300 pt-8 mb-8">
            <div className="text-gray-700 mb-2">
              Payment is due within 30 days. Late payments are subject to fees.
            </div>
            <div className="text-gray-700 mb-2">
              Please make checks payable to Your Company Name and mail to:
            </div>
            <div className="text-gray-700">
              Jln. Veteran, Jakarta pusat, DKI Jakarta
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
