import { useState } from "react";
import Button from "../src/components/Button/Button";
import Modal from "../src/components/Setting/Modal";
import ModalAge from "../src/components/Account/ModalAge";
import ModalWeight from "../src/components/Account/ModalWeigth";
/* This pages contain to separate comlumes like one for 
   settings and one for the profile picture
   We both show the information about the settings 
   and a bow to change the setttings
*/

export default function profile() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div></div>
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
    </>
  );
}
