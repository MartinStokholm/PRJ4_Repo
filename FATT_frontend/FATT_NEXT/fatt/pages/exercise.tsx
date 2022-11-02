// import Exercises from '../../interfaces/Exercises';
import exerciseHandler from "./api/exercise/[id]";
import HeadComponent from "../src/components/Meta";
import Image from "next/image";
import Link from "next/link";
import type { Exercise } from "../interfaces/Exercises";
import { useQuery } from "react-query";
import axios from "axios";
import fecthExercises from "../src/fetchers/exercise";
import Button from "../src/components/Button";

const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function ExercisePage() {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "exerciseKey",
    fecthExercises,
    {
      enabled: false, // Disable loading when the exercisePage is loading
      //   cacheTime: 50000, // Default is 5 minuts
      //   staleTime: 30000, // If we don't need update much and first update after 30 seconds
      //   refetchOnMount: false, // Will no opdate when page is called
      //   refetchInterval: 2000, // the query will automatic refresh every 2 seconds
      //   refetchIntervalInBackground: true, // will update automatic in background
      refetchOnWindowFocus: true, // Every time your tab loose focus and we gain it again it updates
      // In other words list will automated update when change in db
      onSuccess: onSuccess, // This function is calledback function
      onError, // Key value is the same as the key, so we can drop writing the key
      select: (data) => {
        const exerciseName = data.data.map((exercise) => exercise.name);
        return exerciseName;
      },
    }
  );

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
      {data.map((exerciseName) => {
        return <div key={exerciseName}>{exerciseName} </div>;
      })}
    </div>
  );
}
