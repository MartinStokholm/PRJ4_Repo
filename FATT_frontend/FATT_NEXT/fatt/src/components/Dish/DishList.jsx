import DishItemThumbnail from "./DishItemThumbnail";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../util/Modal";
import DishModal from "./DishModal";
import Heading from "../Layout/Heading";
const DishList = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Heading text="The dish collection" />
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
        <div className="text-center">
          <Button
            onClick={() => setShowModal(true)}
            text={"Create Dish"}
            key={undefined}
          />
        </div>
        <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
          <DishModal />
        </Modal>
        <div className="flex flex-wrap">
          {data?.data?.map((dish) => {
            return (
              <div
                key={dish.id}
                className="w-1/2 md:w-1/4 mb-4 mt-4 px-4 md:px-8"
              >
                {" "}
                {<DishItemThumbnail dish={dish} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DishList;
