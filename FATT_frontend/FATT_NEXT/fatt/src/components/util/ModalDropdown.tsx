import { useState, useEffect } from "react";
import DropdownButton from "../Button/DropdownButton";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import e from "cors";

export default function Modal({ IsVisible, onClose, children }) {
  if (!IsVisible) return null;

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === `wrapper`) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center  "
      onClick={handleClose}
      id="wrapper"
    >
      <div className=" overflow-auto scrollbar-hide md:scrollbar-default ">
        <DropdownButton text={"X"} onClick={() => onClose()} key={undefined} />
        <div className="bg-white p-2 rounded min-h-[18rem] ">{children}</div>
      </div>
    </div>
  );
}
