import React from "react";
import PropTypes from "prop-types";
import { FaBox, FaTag, FaEdit, FaTrash, FaIdCard } from "react-icons/fa";
import CardNotFound from "./CardNotFound";
import { useDispatch } from "react-redux";
import { modalDelete, modalUpdate } from "../../store/sliceModal";

const CardProduct = ({ data, loading }) => {
  const dispatch = useDispatch()

  if (loading) {
    return (
      <div className="xs:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-200 rounded flex-1"></div>
              <div className="h-8 bg-gray-200 rounded flex-1"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
        <CardNotFound title="Product"/>
    );
  }

  const handleUpdate = (id) => {
      dispatch(modalUpdate({ url: `products`, id }));
  };

  const handleDelete = (id) => {
      dispatch(modalDelete({ url: `products`, id }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="xs:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
      {data.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <div className="p-4">

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <FaIdCard className="text-purple-500 mr-2" />
                <span className="text-sm font-medium text-gray-900">ID: {product.kode}</span>
              </div>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                #{product.id.slice(-4)}
              </span>
            </div>

            <div className="flex items-center mb-2">
              <FaBox className="text-gray-400 mr-2 text-sm" />
              <span className="text-sm text-gray-600">Product:</span>
              <span className="text-sm font-medium text-gray-900 ml-1 truncate">
                {product.name}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <FaTag className="text-gray-400 mr-2 text-sm" />
              <span className="text-sm text-gray-600">Price:</span>
              <span className="text-sm font-semibold text-green-600 ml-1">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="flex space-x-2">
              {product.action.includes("update") && (
                <button onClick={() => {handleUpdate(product.id)}} className="flex items-center justify-center flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaEdit className="mr-1" />
                  Edit
                </button>
              )}
              {product.action.includes("delete") && (
                <button onClick={() => {handleDelete(product.id)}} className="flex items-center justify-center flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaTrash className="mr-1" />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

CardProduct.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      kode: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      action: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  loading: PropTypes.bool,
};

export default CardProduct;