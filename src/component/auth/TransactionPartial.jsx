import React from "react";
import PropTypes from "prop-types";

const TransactionPartial = ({ label, type, value, children }) => {
  return (
    <>
      <label className={` text-black p-1 flex items-center gap-1 w-full`}>
        <div className="w-[100px] p-1 border-2 flex">{children}</div>
        <input
          value={value}
          type={type}
          className={` text-black border-2 bg-slate-200 w-full p-1 outline-none `}
          placeholder={label}
          disabled
        />
      </label>
    </>
  );
};

TransactionPartial.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  children: PropTypes.node.isRequired,
};

export default TransactionPartial;
