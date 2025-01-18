import React from "react";
import PropTypes from "prop-types";
import { FormattedDate } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const HeaderPageDetail = ({ date, handleEditToggle, openEdit }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="border-b-2 mt-5 lg:border-b-4 border-black pt-5 pb-3">
        <div className="flex justify-between items-center">
          <div className="mb-0">
            <div className="text-md tab:text-md">
              Updated: {date ? FormattedDate(date) : ""}{" "}
            </div>
          </div>
          <div className="flex gap-3 items-center ">
            {handleEditToggle && (
              <button
                onClick={handleEditToggle}
                className=" h-[40px] rounded-md p-1 text-md  tab:text-md font-normal border-2 border-black bg-black text-white text-center hover:bg-white  hover:text-black hover:border-white"
              >
                {!openEdit ? "Edit" : "Cancel"}
              </button>
            )}
            <button
              onClick={() => navigate(-1)}
              className=" h-[40px] rounded-md p-1 text-md tab:text-md font-normal border-2 border-black bg-black text-white text-center hover:bg-white  hover:text-black hover:border-white"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

HeaderPageDetail.propTypes = {
  date: PropTypes.string,
  handleEditToggle: PropTypes.func,
  openEdit: PropTypes.bool,
};

export default HeaderPageDetail;
