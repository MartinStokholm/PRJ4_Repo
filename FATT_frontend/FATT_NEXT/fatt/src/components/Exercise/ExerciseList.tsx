import ExerciseItemThumbnail from "./ExerciseItemThumbnail";
import Select from "react-select";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Setting/Modal";
import ExerciseModal from "./ExerciseModal";

const ExerciseList = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <Button
          onClick={() => setShowModal(true)}
          text={"Create Exercise"}
          key={undefined}
        />
      </div>
      <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
        <ExerciseModal />
      </Modal>
      <div className="flex flex-wrap">
        {data?.data?.map((exercise) => {
          return (
            <div
              key={exercise.id}
              className="w-1/2 md:w-1/4 mb-4 mt-4 px-4 md:px-8"
            >
              {" "}
              {<ExerciseItemThumbnail exercise={exercise} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ExerciseList;
