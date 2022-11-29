import ModalButton from "../Button/ModalButton";

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
      <div className="flex flex-col max-h-screen overflow-auto scrollbar-hide md:scrollbar-default">
        <ModalButton text={"Close"} onClick={() => onClose()} />
        <div className="bg-white p-2 rounded-b ">{children}</div>
      </div>
    </div>
  );
}
