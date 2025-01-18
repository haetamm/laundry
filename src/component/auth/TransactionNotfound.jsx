import React from "react";
import { useNavigate } from "react-router-dom";

const TransactionNotfound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-[60px] mx-auto mb-[3.5rem] xs:mb-0 xs:ml-[70px] xl:ml-[16rem] overflow-auto items-center">
        <div className="bg-white rounded-lg px-3 md:px-8 mx-auto py-10 max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Transaction Not Found
          </h1>
          <p className="text-gray-700 mb-4">
            We couldn’t find the transaction you were looking for. Please check
            the ID and try again.
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionNotfound;
