import PropTypes from 'prop-types'
import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa'

const CardNotFound = ({ title }) => {
  return (
    <div className="xs:hidden flex flex-col items-center justify-center py-12">
        <FaExclamationCircle className="text-gray-400 text-6xl mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No {title} Found</h3>
        <p className="text-gray-500 text-center max-w-md">
            There are no {title.toLowerCase()} available at the moment. 
            Create a new {title.toLowerCase()} to get started.
        </p>
    </div>
  )
}

CardNotFound.propTypes = {
  title: PropTypes.string,
};

export default CardNotFound
