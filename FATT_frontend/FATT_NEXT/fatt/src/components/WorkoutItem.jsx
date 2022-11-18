import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import { useState } from "react";
import MyButton from "./Button";

import {
  updateWorkoutRemoveExercise,
  useUpdateWorkoutRemoveExercise,
} from "../../src/mutation/workout/PutWorkoutRemoveExercise";

const onSucces = () => {
  <div
    class="bg-blue-100 rounded-lg py-5 px-6 mb-3 text-base text-blue-700 inline-flex items-center w-full"
    role="alert"
  >
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="info-circle"
      class="w-4 h-4 mr-2 fill-current"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
      ></path>
    </svg>
    A simple primary alert - check it out!
  </div>;
};

const WorkoutItem = ({ workoutData, exerciseData }) => {
  // State for exercise id
  const workoutId = workoutData?.data?.id;

  const handleRemoveButtonClick = (exerciseId) => {
    updateWorkoutRemoveExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutRemoveExercise } =
    useUpdateWorkoutRemoveExercise(onSucces);

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
                key={exercise.id}
              />
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default WorkoutItem;
