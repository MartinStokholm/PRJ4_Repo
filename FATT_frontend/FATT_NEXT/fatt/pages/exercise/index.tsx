import Image from "next/image";
import Link from "next/link";
import Button from "../../src/components/Button";
import {useExercisesData} from "../../src/hooks/useExercisesData";

import styles from '../../styles/Layout.module.css'

const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function ExercisePage() {
  const { isLoading, data, isError, error, isFetching, refetch } = 
       useExercisesData (onSuccess, onError);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className={styles.grid}>
      <h2>Exercises</h2>
      <Button text={"Get exercise"} onClick={refetch} />
      {data?.data.map((exercise) => {
        return <div key={exercise.id} className={styles.card}>
          { <Link href={{
                        pathname:`/exercise/${exercise.id}`,
                        // query: {id: `${exercise.id}`}
                      }} key={exercise.id}
                        
          >
                        {exercise.name}
                        
          </Link> }
          {/* <Link  to={`/exercise/${exercise.id}`}>{exercise.name}</Link> */}
          </div>;
      })}
      {/* {data?.map((exerciseName) => {
        return <div key={exerciseName}>{exerciseName} </div>;
      })} */}
    </div>
  );
}
