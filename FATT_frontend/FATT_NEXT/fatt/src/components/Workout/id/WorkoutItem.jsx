import Modal from "../../util/Modal";
import AddExercise from "./AddExercise";
import RemoveExercise from "./RemoveExercise";
import { useState } from "react";
import Button from "../../Button/Button";

const WorkoutItem = ({ workoutData, exerciseData }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="md:flex flex-cols">
        <div className="text-center">
          <h1 className="mt-4 font-bold">{workoutData?.data?.name}</h1>
          <h2 className="italic mb-2">{workoutData?.data?.duration}</h2>
          <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
            <Button
              onClick={() => setShowModal(true)}
              text={"Add exercise"}
              key={undefined}
            />
          </div>
          <RemoveExercise
            workoutData={workoutData}
            exerciseData={exerciseData}
          />
        </div>
        <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
          <AddExercise workoutData={workoutData} exerciseData={exerciseData} />
        </Modal>
      </div>
    </>
  );
};

export default WorkoutItem;
