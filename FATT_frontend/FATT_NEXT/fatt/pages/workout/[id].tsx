import { getWorkout } from "../../src/queries/Workout";
import getExercisesList from "../../src/queries/Exercises";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useUpdateWorkoutAddExerciseData } from "../../src/mutation/workout/PutWorkoutAddExercise";
import { useRouter } from "next/router";
import WorkoutItem from "../../src/components/WorkoutItem";
import Error from "next/error";

export default function WorkoutPage() {
  // Get id from route
  const workoutId = useRouter().query.id as string;
  //parseInt(useRouter().query.id as string, 10);

  // Get Workout
  const {
    isLoading,
    data: workoutData,
    isError,
    error,
  } = getWorkout(workoutId);
  // Get Exercises
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
      {/* This is a idea only. We map a button add and remove relative to if the 
          workout already contains the exercise. I going to move all the put information (mutate) in 
          a component were we only have to give id's with  */}
      <WorkoutItem workoutData={workoutData} exerciseData={exerciseData} />

      {/* <Button onClick={handleAddButtonClick} text={"Add"} /> */}
    </>
  );
}
