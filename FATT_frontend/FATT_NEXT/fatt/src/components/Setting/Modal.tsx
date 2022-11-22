import { useState, useEffect } from "react";
import ModalButton from "../Button/ModalButton";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import e from "cors";

export default function Modal({ IsVisible, onClose, children }) {
  if (!IsVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === `wrapper`) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center "
      onClick={handleClose}
      id="wrapper"
    >
      <div className="w-[600px flex flex-col">
        <ModalButton text={"X"} onClick={() => onClose()} />
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
}
