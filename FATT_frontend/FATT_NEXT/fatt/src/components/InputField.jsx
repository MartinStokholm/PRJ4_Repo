import React from "react";

const InputField = ({ required, value, onChange, type, placeholder }) => {
  return (
    <input
      className="mx-auto my-4 md:mx-4 border rounded border-grey-300"
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
      required={required}
    />
  );
};

export default InputField;
