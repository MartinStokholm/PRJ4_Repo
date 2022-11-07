import { useWorkoutsData } from "../../src/hooks/useWorkoutsData";
import { useExercisesData } from "../../src/hooks/useExercisesData";
import styles from "../../styles/Workout.module.css";
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
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      {/* This maps out all workouts with their exercise as names */}
      {WorkoutData.data?.map((workout) => (
        <div className={styles.listItem} key={workout.name}>
          <Link href={{ pathname: `/workout/${workout.id}` }} key={workout.id}>
            <h1>{workout.name}</h1>
            <h2>{workout.duration}</h2>

            {ExerciseData?.data.map((exercise) =>
              workout.exercisesIds.includes(exercise.id) ? (
                <div className={styles.description} key={exercise.id}>
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
