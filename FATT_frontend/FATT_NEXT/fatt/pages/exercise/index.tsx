import LoadingSpinner from "../../src/components/LoadingSpinner";
import ExerciseList from "../../src/components/ExerciseList";
import getExercisesList from "../../src/queries/Exercises";
import Error from "next/error";
import { Exercises } from "../../interfaces/Exercise";

export default function ExercisePage() {
  const { isLoading, data, isError, error, isFetching, refetch } =
    getExercisesList();
  //convert to to of interface.
  let exercises: Exercises = null;
  exercises = data;

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <Error statusCode={error.message} />
      </>
    );
  }
  return (
    <>
      <ExerciseList data={exercises} />
    </>
  );
}
