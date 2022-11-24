import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import Button from "../Button/Button";
import DeleteButton from "../Button/DeleteButton";
import { useUpdateWorkoutRemoveExercise } from "../../mutation/workout/PutWorkoutRemoveExercise";
import { useRouter } from "next/router";
import { useUpdateWorkoutAddExerciseData } from "../../mutation/workout/PutWorkoutAddExercise";
import { useState } from "react";
import Modal from "../util/Modal";

const WorkoutItem = ({ workoutData, exerciseData }) => {
  const [showModal, setShowModal] = useState(false);
  // State for exercise id
  const workoutId = useRouter().query.id;

  const handleRemoveButtonClick = (exerciseId) => {
    updateWorkoutRemoveExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutRemoveExercise } =
    useUpdateWorkoutRemoveExercise();

  const handleAddButtonClick = (exerciseId) => {
    updateWorkoutAddExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutAddExercise } =
    useUpdateWorkoutAddExerciseData();

  return (
    <>
      <div className="md:flex flex-cols">
        <div className="text-center">
          <h1 className="mt-4 font-bold">{workoutData?.data?.name}</h1>
          <h2 className="italic">{workoutData?.data?.duration}</h2>
          <Button onClick={() => setShowModal(true)} text={"Add exercise"} />
          {exerciseData?.data.map((exercise) =>
            workoutData?.data?.exercisesIds?.includes(exercise.id) ? (
              <div
                key={exercise.id}
                className="bg-white overflow-hidden shadow-lg mx-4 my-4 flex"
              >
                <DeleteButton
                  text={"Remove"}
                  onClick={() => {
                    handleRemoveButtonClick(exercise.id);
                  }}
                />
                <WorkoutItemThumbnail exercise={exercise} />
              </div>
            ) : null
          )}
        </div>

        <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
          <div>
            <h1 className="mt-4 font-bold">All exercises</h1>
            <h2 className="italic">
              That you can add too {workoutData?.data?.name}
            </h2>

            {exerciseData?.data.map((exercise) =>
              workoutData?.data?.exercisesIds?.includes(exercise.id) ? null : (
                <div
                  key={exercise.id}
                  className="bg-white overflow-hidden shadow-lg mx-4 my-4 flex"
                >
                  <Button
                    text={"Add"}
                    onClick={() => {
                      handleAddButtonClick(exercise.id);
                    }}
                  />
                  <WorkoutItemThumbnail exercise={exercise} />
                </div>
              )
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default WorkoutItem;
