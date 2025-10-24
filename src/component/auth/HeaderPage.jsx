import React from "react";
import PropTypes from "prop-types";

const HeaderPage = ({ title, handleAddButton }) => {
  return (
    <>
      <div className="fixed w-full top-0 left-0 right-0 xs:relative bg-white border-b-2 lg:border-b-4 border-black py-5 px-4 z-10">
        <div className="flex justify-between items-center max-w-full">
          <div className="flex-shrink-0">
            <div className="text-xl xs:text-2xl sm:text-3xl font-medium truncate max-w-[150px] xs:max-w-none">
              {title}
            </div>
          </div>
          <button
            onClick={handleAddButton}
            className="flex-shrink-0 py-2 px-3 border-2 rounded-md border-slate-300 text-center hover:bg-slate-300 hover:border-white text-sm xs:text-base whitespace-nowrap ml-2"
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
