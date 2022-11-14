import React from "react";
import ColumnItems from "./ColumnItems";
import ColumnHeader from "./ColumnHeader";
const CalenderColumn = ({ day }) => {
  return (
    <div className="border rounded border-green-300">
      <ColumnHeader day={day} />
      <ColumnItems />
    </div>
  );
};

export default CalenderColumn;
