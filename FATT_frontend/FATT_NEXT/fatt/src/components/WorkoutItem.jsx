import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import { useState } from "react";
import MyButton from "./Button";

import {
  updateWorkoutRemoveExercise,
  useUpdateWorkoutRemoveExercise,
} from "../../src/mutation/workout/PutWorkoutRemoveExercise";

const WorkoutItem = ({ workoutData, exerciseData }) => {
  // State for exercise id
  const workoutId = workoutData?.data?.id;

  const handleRemoveButtonClick = (exerciseId) => {
    updateWorkoutRemoveExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutRemoveExercise } =
    useUpdateWorkoutRemoveExercise();

  return (
    <>
      <div>
        <h1 className="mt-4 font-bold">{workoutData?.data?.name}</h1>
        <h2 className="italic">{workoutData?.data?.duration}</h2>
        {/* This maps out all exercises for the workout and 
              add a remove button on each exercise
              */}

        {exerciseData?.data.map((exercise) =>
          workoutData?.data?.exercisesIds?.includes(exercise.id) ? (
            <div
              key={exercise.id}
              className="bg-white overflow-hidden shadow-lg mx-4 my-4"
            >
              <WorkoutItemThumbnail exercise={exercise} />
              <MyButton
                text={"Remove"}
                onClick={() => {
                  handleRemoveButtonClick(exercise.id);
                }}
              />
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default WorkoutItem;
