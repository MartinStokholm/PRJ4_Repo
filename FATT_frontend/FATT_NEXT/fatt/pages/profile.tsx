import { useState } from "react";
import Button from "../src/components/Button/Button";
import Modal from "../src/components/util/Modal";
import ModalAge from "../src/components/Account/ModalAge";
import ModalWeight from "../src/components/Account/ModalWeigth";
import ModalGender from "../src/components/Account/ModalGender";
import ModalName from "../src/components/Account/ModalName";
import Heading from "../src/components/Layout/Heading";
import Profile from "../src/components/Account/Profile";

export default function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Heading text="My Profile" />
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
        <div className="text-center">
          <Button
            onClick={() => setShowModal(true)}
            text={"Update Profile"}
            key={undefined}
          />
        </div>
        <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
          <ModalName />
          <ModalAge />
          <ModalWeight />
          <ModalGender />
        </Modal>
        <div>
          <Profile />
        </div>
      </div>
    </div>
  );
}
