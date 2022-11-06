import Image from "next/image";
import { useQuery } from "react-query";
import fecthWorkouts from "../../src/fetchers/Workouts";
import { useWorkoutsData } from "../../src/hooks/useWorkoutsData";
import { useExercisesData } from "../../src/hooks/useExercisesData";
import styles from "../../styles/Workout.module.css";

const onSuccess = (WorkoutData, ExerciseData) => {
  {
    /* Maybe we only should show data if success*/
  }

  console.log("Perform side effect after data fetching", ExerciseData);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function Workout() {
  const { isLoading, data: WorkoutData, isError, error } = useWorkoutsData();

  const { data: ExerciseData } = useExercisesData(onSuccess, onError);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2 className={styles.titel}>Workouts</h2>

      <div className={styles.container}>
        {/* This maps out all workouts with there exercise as names */}
        {WorkoutData.data?.map((workout) => (
          <div className={styles.caption} key={workout.name}>
            {workout.name}
            {ExerciseData?.data.map((exercise) =>
              workout.exercisesIds.includes(exercise.id) ? (
                <div className={styles.description} key={exercise.id}>
                  {exercise.name}
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
