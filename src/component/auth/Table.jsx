import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { getActionClass } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { modalDelete, modalUpdate } from "../../store/sliceModal";

import "../../styles/component/table.scss";

const Thead = ({ columns }) => {
  return (
    <tr>
      <th className="bg-blue-600 text-white font-semibold py-4 text-lg px-4 text-center sticky top-0 z-10">
        No.
      </th>
      {columns.map((column, index) => (
        <th 
          key={index} 
          className={`bg-blue-600 text-white font-semibold text-lg py-3 px-4 text-center sticky top-0 z-10 ${column.className || ""}`}
        >
          {column.label}
        </th>
      ))}
    </tr>
  );
};

Thead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ),
};

const Table = ({ columns, data, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);
  const path = pathSegments[1] || "";

  const handleAction = (action, { id }) => {
    if (action == "detail") {
      navigate(`/dashboard/${path}/${id}`);
    }
    if (action == "update") {
      dispatch(modalUpdate({ url: `${path}s`, id }));
    }
    if (action == "delete") {
      dispatch(modalDelete({ url: `${path}s`, id }));
    }
  };

  return (
    <div className="overflow-x-auto hidden xs:block bg-white rounded-lg shadow-lg border border-blue-100 max-h-[calc(100vh-180px)] xs:max-h-[calc(100vh-120px)]">
      <table className="w-full border-collapse">
        <thead className="sticky top-0">
          <Thead columns={columns} />
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td 
                colSpan={columns.length + 1} 
                className="py-8 text-center text-gray-500"
              >
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3">Loading data...</span>
                </div>
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`${
                  rowIndex % 2 === 0 
                    ? "bg-white hover:bg-blue-50" 
                    : "bg-blue-50/30 hover:bg-blue-100"
                } transition-colors duration-200 border-b border-blue-100`}
              >
                <th className="py-3 px-4 text-center font-semibold text-gray-700 bg-white">
                  {rowIndex + 1}
                </th>
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="py-3 px-4 text-center text-gray-600"
                  >
                    {column.key === "action"
                      ? item[column.key].map((action, actionIndex) => (
                          <button
                            onClick={() => {
                              handleAction(action, item);
                            }}
                            key={actionIndex}
                            className={`${getActionClass(action)} mx-1 px-3 mb-2 md:mb-0 py-1 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105`}
                          >
                            {action}
                          </button>
                        ))
                      : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length + 1} 
                className="py-8 text-center text-gray-500"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-6V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v3m4 0H9" />
                  </svg>
                  Data tidak tersedia
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Table;