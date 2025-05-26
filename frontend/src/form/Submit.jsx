import React from "react";

const Submit = ({ value }) => {
  return (
    <div>
      <input
        type="submit"
        value={value}
        className="w-full rounded bg-white  text-secondary hover:bg-opacity-90 transition font-semibold cursor-pointer p-1"
      />
    </div>
  );
};

export default Submit;
