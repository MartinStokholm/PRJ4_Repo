import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useWorkoutsData } from "../../src/hooks/useWorkoutsData";
import { useExercisesData } from "../../src/hooks/useExercisesData";
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
    return;
    <>
      <p>Something went wrong</p>
    </>;
  }

  return (
    <>
      {/* This maps out all workouts with their exercise as names */}
      {WorkoutData.data?.map((workout) => (
        <div key={workout.name} className="w-1/3 mb-4 px-2">
          <Link href={{ pathname: `/workout/${workout.id}` }} key={workout.id}>
            <h1>{workout.name}</h1>
            <h2>{workout.duration}</h2>

            {ExerciseData?.data.map((exercise) =>
              workout.exercisesIds.includes(exercise.id) ? (
                <div key={exercise.id}>
                  <p>{exercise.name}</p>
                </div>
              ) : null
            )}
          </Link>
        </div>
      ))}
    </>
  );
}
