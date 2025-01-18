import React from "react";
import PropTypes from "prop-types";

const HeaderPage = ({ title, handleAddButton }) => {
  return (
    <>
      <div className="border-b-2 lg:border-b-4 border-black py-5">
        <div className="flex justify-between items-center">
          <div className=" mb-0">
            <div className="text-3xl">{title}</div>
          </div>
          <button
            onClick={handleAddButton}
            className=" py-2 px-3 border-2 rounded-md border-slate-300 text-center hover:bg-slate-300 hover:border-white"
          >
            + {title}
          </button>
        </div>
      </div>
    </>
  );
};

HeaderPage.propTypes = {
  title: PropTypes.string.isRequired,
  handleAddButton: PropTypes.func,
};

export default HeaderPage;
