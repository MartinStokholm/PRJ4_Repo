// import Exercises from '../../interfaces/Exercises';
import exerciseHandler from "./api/exercise/[id]";
import HeadComponent from "../src/components/Meta";
import Image from "next/image";
import Link from "next/link";
// import type { Exercise } from "../interfaces/Exercises";
import { useQuery } from "react-query";
import axios from "axios";
import fecthExercises from "../src/fetchers/exercise";
import Button from "../src/components/Button";
import {useExercisesData} from "../src/hooks/useExercisesData";


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
    <div>
      <h2>Exercises</h2>
      <Button text={"Get exercise"} onClick={refetch} />
      {/* {data?.data.map((exercise) => {
        return <div key={exercise.name}>{exercise.name} </div>;
      })} */}
      {data?.map((exerciseName) => {
        return <div key={exerciseName}>{exerciseName} </div>;
      })}
    </div>
  );
}
