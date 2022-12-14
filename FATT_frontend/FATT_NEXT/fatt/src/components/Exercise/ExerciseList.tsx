import ExerciseItemThumbnail from "./ExerciseItemTHumbnail";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../util/Modal";
import ExerciseModal from "./ExerciseModal";
import Heading from "../Layout/Heading";

const ExerciseList = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Heading text="The exercise collection" />
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
        <div className="text-center">
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
      </div>
    </div>
  );
};

export default ExerciseList;
