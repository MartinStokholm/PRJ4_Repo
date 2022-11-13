import React from "react";
const ColumnHeader = ({ day }) => {
  return (
    <div className="border-b rounded border-green-500 mb-4">
      <div>
        <h1>{day}</h1>
      </div>
    </div>
  );
};

export default ColumnHeader;
