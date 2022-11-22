import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import ExerciseList from "../../src/components/Exercise/ExerciseList";
import getExercisesList from "../../src/queries/Exercises";
import Error from "next/error";
import { Exercises } from "../../interfaces/Exercise";

const onSuccess = (ExerciseData) => {
  {
    /* Maybe we only should show data if success*/
  }

  console.log("Perform side effect after data fetching", ExerciseData);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function ExercisePage() {
  const { isLoading, data, isError, error, isFetching, refetch } =
    getExercisesList(onSuccess, onError);
  //convert to to of interface.
  let exercises: Exercises = null;
  exercises = data;

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <Error statusCode={(error as any).message} />
      </>
    );
  }
  return (
    <>
      <ExerciseList data={exercises} />
    </>
  );
}
