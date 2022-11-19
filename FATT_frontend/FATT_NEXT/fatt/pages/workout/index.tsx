import LoadingSpinner from "../../src/components/LoadingSpinner";
import { getWorkoutsList } from "../../src/queries/Workouts";
import getExercisesList from "../../src/queries/Exercises";
import WorkoutList from "../../src/components/WorkoutList";
import Error from "next/error";
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
  const {
    isLoading,
    data: workoutData,
    isError,
    error,
  } = getWorkoutsList(onSuccess, onError);

  const { data: exerciseData } = getExercisesList(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={(error as any).message} />;
  }

  return <WorkoutList workoutData={workoutData} exerciseData={exerciseData} />;
}
