import { useState } from "react";
import Button from "../src/components/Button/Button";
import Modal from "../src/components/util/Modal";
import ModalAge from "../src/components/Account/ModalAge";
import ModalWeight from "../src/components/Account/ModalWeigth";
import ModalGender from "../src/components/Account/ModalGender";
import Heading from "../src/components/Layout/Heading";
import Profile from "../src/components/Account/Profile";
export default function profile() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col">
      <Heading text="My Profile" />
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
        <ModalGender />
      </Modal>
      <div>
        <Profile />
      </div>
    </div>
  );
}
