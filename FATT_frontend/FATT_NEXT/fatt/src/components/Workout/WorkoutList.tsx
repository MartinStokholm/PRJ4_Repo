import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import Link from "next/link";
import DeleteButton from "../Button/DeleteButton";
import WorkoutModal from "./CreateWorkoutModal";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../util/Modal";
import ModalDropdown from "../util/ModalDropdown";
import { useDeleteWorkout } from "../../mutation/workout/DeleteWorkout";
import AddWorkoutToCalendarModal from "./AddWorkoutToCalendarModal";

const WorkoutList = ({ workoutData, exerciseData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAddToCalendarModal, setShowAddToCalendarModal] = useState(false);
  const [idPassToModal, setIdPassToModal] = useState();
  const { mutate: deleteWorkout } = useDeleteWorkout();

  const handleDeleteButtonClick = (workoutId: number) => {
    deleteWorkout(workoutId);
  };
  // const handleAddToCalendarModalClick = (workoutId: number) => {
  //   deleteWorkout(workoutId);
  // };

  return (
    <div>
      <div className="text-center">
        <Button
          onClick={() => setShowModal(true)}
          text={"Create Workout"}
          key={undefined}
        />
      </div>

      <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
        <WorkoutModal />
      </Modal>

      <ModalDropdown
        IsVisible={showAddToCalendarModal}
        onClose={() => setShowAddToCalendarModal(false)}
      >
        <AddWorkoutToCalendarModal id={idPassToModal} />
      </ModalDropdown>

      <div className="flex flex-wrap justify-center">
        {/* This maps out all workouts with their exercise as names */}
        {workoutData.data?.map((workout) => (
          <div
            key={workout.name}
            className="rounded bg-white shadow-lg w-full md:w-1/3 m-4 flex flex-col justify-center"
          >
            <div className="flex flex-col justify-center">
              <Link
                href={{ pathname: `/workout/${workout.id}` }}
                key={workout.id}
                className="hover:bg-green-50 hover:shadow-inner flex justify-center"
              >
                <h1 className="m-2 font-bold py-1">{workout.name}</h1>

                <h2 className="m-2 italic py-1">{workout.duration}</h2>
              </Link>
            </div>
            <div>
              {exerciseData?.data.map((exercise) =>
                workout?.exercisesIds?.includes(exercise.id) ? (
                  <div
                    key={exercise.id}
                    className="bg-white overflow-hidden shadow-lg mx-4 my-4"
                  >
                    <WorkoutItemThumbnail exercise={exercise} />
                  </div>
                ) : null
              )}
            </div>
            <DeleteButton
              text={"Delete"}
              onClick={() => {
                handleDeleteButtonClick(workout.id);
              }}
            />
            <Button
              text={"Add To Calendar"}
              onClick={() => {
                setShowAddToCalendarModal(true);
                setIdPassToModal(workout.id);
              }}
              key={undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
