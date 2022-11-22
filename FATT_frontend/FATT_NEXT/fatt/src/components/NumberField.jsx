import React from "react";

const NumberField = ({ required, value, onChange, placeholder, min, max }) => {
  return (
    <input
      className="mx-auto my-4 md:mx-4 border rounded border-grey-300"
      placeholder={placeholder}
      type="number"
      onChange={onChange}
      value={value}
      required={required}
      min={min}
      max={max}
    />
  );
};

export default NumberField;
