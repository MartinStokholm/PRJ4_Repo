import LoadingSpinner from "../../src/components/LoadingSpinner";
import ExerciseList from "../../src/components/ExerciseList";
import { getExercisesList } from "../../src/queries/Exercises";
import Error from "next/error";
import { Exercises } from "../../interfaces/Exercise";
const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function ExercisePage() {
  const { isLoading, data, isError, error, isFetching, refetch } =
    getExercisesList(onSuccess, onError);
  //
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
