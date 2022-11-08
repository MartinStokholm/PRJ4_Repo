import { useWorkoutData } from "../../src/hooks/useWorkoutData";
import { useExercisesData } from "../../src/hooks/useExercisesData";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import Link from "next/link";
import Button from "../../src/components/Button";
import { useUpdateWorkoutAddExerciseData } from "../../src/mutation/PutWorkoutAddExercise";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  updateWorkoutRemoveExercise,
  useUpdateWorkoutRemoveExercise,
} from "../../src/mutation/PutWorkoutRemoveExercise";

const onSuccess = (WorkoutData, ExerciseData) => {
  {
    /* Maybe we only should show data if success*/
  }

  console.log("Perform side effect after data fetching", ExerciseData);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function WorkoutPage() {
  // Get id from route
  const workoutId = useRouter().query.id as string;
  //parseInt(useRouter().query.id as string, 10);
  console.log(workoutId);
  // Get Workout
  const {
    isLoading,
    data: WorkoutData,
    isError,
    error,
  } = useWorkoutData(workoutId);
  // Get Exercises
  const { data: ExerciseData } = useExercisesData(onSuccess, onError);

  // State for exercise id
  const [exerciseId, setExerciseId] = useState();

  // Handler for when button is clicked. We send a request to add or remove a specific exercise to/from workout
  const handleAddButtonClick = (exerciseId) => {
    const data = { workoutId, exerciseId };
    console.log(data);
    updateWorkoutAddExercise(data);
  };
  const handleRemoveButtonClick = () => {
    updateWorkoutRemoveExercise({ workoutId, exerciseId });
  };

  // Function call need to mutate date (PUT)
  const { mutate: updateWorkoutAddExercise } =
    useUpdateWorkoutAddExerciseData();
  const { mutate: updateWorkoutRemoveExercise } =
    useUpdateWorkoutRemoveExercise();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <p>We you will be able to add or remove exercises from a workout</p>
      <br />
      {WorkoutData.name}
      <br />
      {/* This is a idea only. We map a button add and remove relative to if the 
          workout already contains the exercise. I going to move all the put information (mutate) in 
          a component were we only have to give id's with  */}
      {ExerciseData?.data.map((exercise) =>
        WorkoutData?.data.exercisesIds.includes(exercise.id) ? (
          <div key={exercise.id}>
            <p>{exercise.name}</p>
            {/* <Button onClick={handleAddButtonClick(exercise.id)} text={"Add"} /> */}
            <br />
          </div>
        ) : (
          <div key={exercise.id}>
            <p>{exercise.name}</p>
            <br />
            {/* <Button onClick={handleRemoveButtonClick(exercise.id)}
              text={"Remove"}
            /> */}
            <br />
          </div>
        )
      )}

      <Button onClick={handleAddButtonClick} text={"Add"} />
      <Button onClick={handleRemoveButtonClick} text={"Remove"} />
    </>
  );
}
