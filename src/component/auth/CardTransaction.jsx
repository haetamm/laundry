import React from "react";
import PropTypes from "prop-types";
import { FaReceipt, FaUser, FaBox, FaEye } from "react-icons/fa";
import CardNotFound from "./CardNotFound";
import { Link } from "react-router-dom";

const CardTransaction = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="xs:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <CardNotFound title="Transaction"/>
    );
  }

  return (
    <div className="xs:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
      {data.map((transaction) => (
        <div key={transaction.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <FaReceipt className="text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-900">ID: {transaction.kode}</span>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                #{transaction.id.slice(-4)}
              </span>
            </div>

            <div className="flex items-center mb-2">
              <FaUser className="text-gray-400 mr-2 text-sm" />
              <span className="text-sm text-gray-600">Customer:</span>
              <span className="text-sm font-medium text-gray-900 ml-1 truncate">
                {transaction.customer}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <FaBox className="text-gray-400 mr-2 text-sm" />
              <span className="text-sm text-gray-600">Products:</span>
              <span className="text-sm font-medium text-gray-900 ml-1">
                {transaction.product} items
              </span>
            </div>

            <div className="flex space-x-2">
              {transaction.action.includes("detail") && (
                <Link to={`/dashboard/transaction/${transaction.id}`} className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaEye className="mr-2" />
                  View Details
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

CardTransaction.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      kode: PropTypes.string.isRequired,
      customer: PropTypes.string.isRequired,
      product: PropTypes.number.isRequired,
      action: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  loading: PropTypes.bool,
};

// Default Props
CardTransaction.defaultProps = {
  data: [],
  loading: false,
};

export default CardTransaction;