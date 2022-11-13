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
import Error from "next/error";
const onSuccess = (workoutData, exerciseData) => {
  {
    /* Maybe we only should show data if success*/
  }

  console.log("Perform side effect after data fetching", exerciseData);
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
    data: workoutData,
    isError,
    error,
  } = useWorkoutData(workoutId);
  // Get Exercises
  const { data: exerciseData } = useExercisesData(onSuccess, onError);

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
    return <Error statusCode={error.message} />;
  }

  return (
    <>
      <p> you will be able to add or remove exercises from a workout</p>
      <br />
      {workoutData.name}
      <br />
      {/* This is a idea only. We map a button add and remove relative to if the 
          workout already contains the exercise. I going to move all the put information (mutate) in 
          a component were we only have to give id's with  */}
      {exerciseData?.data.map((exercise) =>
        workoutData?.data.exercisesIds.includes(exercise.id) ? (
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
