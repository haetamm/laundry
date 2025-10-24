import React from "react";
import PropTypes from "prop-types";
import { FaUser, FaUserTag, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";
import CardNotFound from "./CardNotFound";
import { useDispatch } from "react-redux";
import { modalDelete, modalUpdate } from "../../store/sliceModal";

const CardUser = ({ data, loading }) => {
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
      <CardNotFound title="User" />
    );
  }

  const handleUpdate = (id) => {
      dispatch(modalUpdate({ url: `users`, id }));
  };

  const handleDelete = (id) => {
      dispatch(modalDelete({ url: `users`, id }));
  };

  return (
    <div className="xs:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
      {data.map((user) => (
        <div key={user.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <FaUser className="text-indigo-500 mr-2" />
                <span className="text-sm font-medium text-gray-900">ID: {user.id.slice(0, 8)}...</span>
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                Admin
              </span>
            </div>

            <div className="flex items-center mb-2">
              <FaUser className="text-gray-400 mr-2 text-sm" />
              <span className="text-sm text-gray-600">Name:</span>
              <span className="text-sm font-medium text-gray-900 ml-1 truncate">
                {user.name}
              </span>
            </div>

            <div className="flex items-center mb-2">
              <FaUserTag className="text-gray-400 mr-2 text-sm" />
              <span className="text-sm text-gray-600">Username:</span>
              <span className="text-sm font-medium text-gray-900 ml-1 truncate">
                {user.username}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <FaEnvelope className="text-gray-400 mr-2 text-sm" />
              <span className="text-sm text-gray-600">Email:</span>
              <span className="text-sm font-medium text-gray-900 ml-1 truncate">
                {user.email}
              </span>
            </div>

            <div className="flex space-x-2">
              {user.action.includes("update") && (
                <button onClick={() => {handleUpdate(user.id)}} className="flex items-center justify-center flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaEdit className="mr-1" />
                  Edit
                </button>
              )}
              {user.action.includes("delete") && (
                <button onClick={() => {handleDelete(user.id)}} className="flex items-center justify-center flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200">
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

CardUser.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      action: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  loading: PropTypes.bool,
};

CardUser.defaultProps = {
  data: [],
  loading: false,
};

export default CardUser;