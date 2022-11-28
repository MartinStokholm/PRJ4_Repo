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
      <div className="scrollbar-hide md:scrollbar-default w-1/2">
        <ModalButton text={"Cancel"} onClick={() => onClose()} />
        <div className="bg-white p-2 rounded-b ">{children}</div>
      </div>
    </div>
  );
}
