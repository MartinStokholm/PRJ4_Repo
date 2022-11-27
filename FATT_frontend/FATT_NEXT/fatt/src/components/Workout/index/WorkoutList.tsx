import DeleteButton from "../../Button/DeleteButton";
import WorkoutModal from "./CreateWorkoutModal";
import { useState } from "react";
import Button from "../../Button/Button";
import Modal from "../../util/Modal";
import ModalDropdown from "../../util/ModalDropdown";
import { useDeleteWorkout } from "../../../mutation/workout/DeleteWorkout";
import AddWorkoutToCalendarModal from "./AddWorkoutToCalendarModal";
import Heading from "../../Layout/Heading";
import WorkoutHeader from "./WorkoutHeader";

const WorkoutList = ({ workoutData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAddToCalendarModal, setShowAddToCalendarModal] = useState(false);
  const [idPassToModal, setIdPassToModal] = useState();
  const { mutate: deleteWorkout } = useDeleteWorkout();

  const handleDeleteButtonClick = (workoutId: number) => {
    deleteWorkout(workoutId);
  };

  return (
    <div>
      <Heading text="My Personal Workouts" />
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
        <div className="text-center">
          <Button onClick={() => setShowModal(true)} text={"Create Workout"} />
        </div>

        <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
          <WorkoutModal />
        </Modal>

        <ModalDropdown
          IsVisible={showAddToCalendarModal}
          onClose={() => setShowAddToCalendarModal(false)}
        >
          <AddWorkoutToCalendarModal
            id={idPassToModal}
            onClose={() => setShowAddToCalendarModal(false)}
          />
        </ModalDropdown>

        <div className="flex flex-wrap justify-center">
          {/* This maps out all workouts with their exercise as names */}
          {workoutData.data?.map((workout) => (
            <div
              key={workout.name}
              className="rounded bg-white shadow-lg md:w-1/3 m-4 flex flex-col justify-center"
            >
              <WorkoutHeader workout={workout} />
              <Button
                text={"Add To Calendar"}
                onClick={() => {
                  setShowAddToCalendarModal(true);
                  setIdPassToModal(workout.id);
                }}
              />
              <DeleteButton
                text={"Delete"}
                onClick={() => {
                  handleDeleteButtonClick(workout.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutList;
