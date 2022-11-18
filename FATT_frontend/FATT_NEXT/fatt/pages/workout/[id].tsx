import { getWorkout } from "../../src/queries/Workout";
import getExercisesList from "../../src/queries/Exercises";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useUpdateWorkoutAddExerciseData } from "../../src/mutation/workout/PutWorkoutAddExercise";
import { useRouter } from "next/router";
import WorkoutItem from "../../src/components/WorkoutItem";
import WorkoutSearchbar from "../../src/components/WorkoutSearchbar";
import Error from "next/error";
import { useEffect, useState } from "react";

export default function WorkoutPage() {
  // Get Exercises and workout
  const {
    isLoading,
    data: workoutData,
    isError,
    error,
  } = getWorkout(useRouter().query.id as string);
  const { data: exerciseData } = getExercisesList();

  // Handler for when button is clicked. We send a request to add or remove a specific exercise to/from workout
  const handleAddButtonClick = (exerciseId) => {
    const data = { workoutId, exerciseId };
    console.log(data);
    updateWorkoutAddExercise(data);
  };

  // Function call need to mutate date (PUT)
  const { mutate: updateWorkoutAddExercise } =
    useUpdateWorkoutAddExerciseData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={error.message} />;
  }

  return (
    <>
      <WorkoutSearchbar />
      <WorkoutItem workoutData={workoutData} exerciseData={exerciseData} />
    </>
  );
}
