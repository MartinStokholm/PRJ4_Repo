import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import { GetWorkoutsList } from "../../src/queries/WorkoutsUserspecific";
import WorkoutList from "../../src/components/Workout/index/WorkoutList";
import Error from "next/error";
const onSuccess = () => {
  console.log("Perform side effect after data fetching");
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
  } = GetWorkoutsList(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={(error as any).message} />;
  }

  return <WorkoutList workoutData={workoutData} />;
}
