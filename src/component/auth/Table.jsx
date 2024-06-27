import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom';
import { getActionClass } from '../../utils/helper';
import { useDispatch } from 'react-redux';

import '../../styles/component/table.scss'

const Thead = ({ columns }) => {
  return (
    <tr>
      <th style={{ backgroundColor: "#acb9f3" }}>No.</th>
        {columns.map((column, index) => (
            <td key={index} className={column.className || ''}>{column.label}</td>
        ))}
    </tr>
  );
}

Thead.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        className: PropTypes.string,
    })),
}


const Table = ({ columns, data, loading }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(Boolean)
  const middleSegment = pathSegments[1] || ''


  const handleAction = (action, {id}) => {
    if (action == 'detail') {
      navigate(`/dashboard/${middleSegment}/${id}`)
    }
    if (action == 'delete') {
      dispatch({
        type: "DELETE",
        payload: {
          url: `/${middleSegment}s/${id}`,
        }
      })
    }
  }

  return (
    <div className="overflow-x-auto bg-white max-h-[430px] xs:max-h-[250px] md:max-h-[500px]">
      <table className="table table-zebra table-md table-pin-rows table-pin-cols font-normal">
        <thead>
          <Thead columns={columns} />
        </thead>
         <tbody>
          {loading ? ( 
            <tr>
              <td colSpan={columns.length + 1}>
                Loading...
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                <th>{rowIndex + 1}</th>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.key === 'action' ? (
                      item[column.key].map((action, actionIndex) => (
                        <button
                          onClick={() => { handleAction(action, item) }}
                          key={actionIndex}
                          className={getActionClass(action)}
                        >
                          {action}
                        </button>
                      ))
                    ) : (
                      item[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>Data not available</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    className: PropTypes.string,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired
}

export default Table