import { useWorkoutsData } from "../../src/hooks/useWorkoutsData";
import { useExercisesData } from "../../src/hooks/useExercisesData";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import Link from "next/link";
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
  const { isLoading, data: WorkoutData, isError, error } = useWorkoutsData();

  const { data: ExerciseData } = useExercisesData(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <p>We you will be able to add or remove exercises from a workout</p>
    </>
  );
}
