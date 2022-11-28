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
      <div className="scrollbar-hide md:scrollbar-default">
        <ModalButton text={"Cancel"} onClick={() => onClose()} />
        <div className="bg-white shadow-lg p-2 rounded-b flex flex-wrap">
          {children}
        </div>
      </div>
    </div>
  );
}
