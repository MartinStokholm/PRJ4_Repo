import { useState, useEffect } from "react";
import ModalButton from "../Button/ModalButton";
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
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex flex-col justify-center items-center   "
      onClick={handleClose}
      id="wrapper"
    >
      <div className="scrollbar-hide md:scrollbar-default w-1/2">
        <ModalButton text={"Close"} onClick={() => onClose()} key={undefined} />
        <div className="bg-white p-2 rounded-b ">{children}</div>
      </div>
    </div>
  );
}
