import { useState } from "react";
import Button from "../src/components/Button/Button";
import Modal from "../src/components/Setting/Modal";
import ModalAge from "../src/components/Account/ModalAge";
import ModalWeight from "../src/components/Account/ModalWeigth";

export default function profile() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <Button
          onClick={() => setShowModal(true)}
          text={"Update Profile"}
          key={undefined}
        />
      </div>
      <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
        <ModalAge />
        <ModalWeight />
      </Modal>
      <div></div>
    </>
  );
}
