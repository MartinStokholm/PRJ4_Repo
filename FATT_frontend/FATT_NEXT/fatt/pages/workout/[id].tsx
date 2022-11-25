import { getWorkout } from "../../src/queries/Workout";
import getExercisesList from "../../src/queries/Exercises";
import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import { useRouter } from "next/router";
import WorkoutItem from "../../src/components/Workout/id/WorkoutItem";
import Error from "next/error";

const onSuccess = () => {
  console.log("Perform side effect after data fetching");
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function WorkoutPage() {
  // Get Exercises and workout
  const {
    isLoading,
    data: workoutData,
    isError,
    error,
  } = getWorkout(useRouter().query.id as string);
  const { data: exerciseData } = getExercisesList(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={(error as any).message} />;
  }

  return (
    <div>
      <WorkoutItem workoutData={workoutData} exerciseData={exerciseData} />
    </div>
  );
}
