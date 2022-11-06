import Image from "next/image";
import { useQuery } from "react-query";
import fecthWorkouts from "../../src/fetchers/workout";
import {useWorkoutsData} from "../../src/hooks/useWorkoutsData";
import {useExercisesData} from "../../src/hooks/useExercisesData";
import styles from "../../styles/Workout.module.css";


const onSuccess = ( ExerciseData) => {
  const exerciseIds = useWorkoutsData.data?.map()

  console.log("Perform side effect after data fetching", ExerciseData);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

// function getIndex(WorkoutData){
//   return arr.findIndex(id => WorkoutData.data.exercisesIds == id )
// }

function showExercise(WorkoutData, ExerciseData){
  {console.log("I AM BLUE ExerciseData")}
  {ExerciseData?.data.map((exercise) => (
    <div key={WorkoutData.data.exercisesIds}>
      {exercise.id} {console.log(exercise.id)}
    </div>
  ))}
}

export default function Workout() {
 
  const { isLoading, data: WorkoutData, isError, error, } = 
    useWorkoutsData()
   

  const { data: ExerciseData } = 
  useExercisesData (onSuccess, onError)


  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }





  return (
    <div>
      <h2>Workouts</h2>

      {/* This maps out all workouts with there exercise as names */}
      {WorkoutData.data?.map((workout) => (
        <div className={styles.titel} key={workout.name}>
          {workout.name}
          { ExerciseData?.data.map((exercise ) => (
            workout.exercisesIds.includes(exercise.id) ?
              ( <div className={styles.text} key={exercise.id}>
              {exercise.name}             
           </div>) : null
            
          ))}
      </div>
      ))}

    </div>
  );
}
