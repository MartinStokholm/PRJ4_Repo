import { useRouter } from "next/router";
import { getExercise } from "../../src/queries/Exercise";
import ExerciseItem from "../../src/components/Exercise/ExerciseItem";
import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import Error from "next/error";

const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function ExercisePage() {
  // Get id from route
  const router = useRouter();
  const query = router.query;
  const id = parseInt(router.query.id as string, 10);

  // Get exercise
  const { isLoading, data, isError, error } = getExercise(
    id,
    onSuccess,
    onError
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <>
        <Error statusCode={(error as any).message} />
      </>
    );
  }

  return <ExerciseItem exercise={data} />;
}
