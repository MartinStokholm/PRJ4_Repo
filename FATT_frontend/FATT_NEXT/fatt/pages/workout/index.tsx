import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useWorkoutsData } from "../../src/hooks/useWorkoutsData";
import { useExercisesData } from "../../src/hooks/useExercisesData";
import WorkoutList from "../../src/components/WorkoutList";

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
  const { isLoading, data: workoutData, isError, error } = useWorkoutsData();

  const { data: exerciseData } = useExercisesData(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return;
    <>
      <p>Something went wrong</p>
    </>;
  }

  return <WorkoutList workoutData={workoutData} exerciseData={exerciseData} />;
}
