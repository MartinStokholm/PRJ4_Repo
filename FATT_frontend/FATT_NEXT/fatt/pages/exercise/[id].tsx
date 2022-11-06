
import { useRouter } from "next/router"
import { useExerciseData } from "../../src/hooks/useExerciseData";
import ExerciseItem  from "../../src/components/ExerciseItem";

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
  const id = parseInt(router.query.id as string ,10)
  console.log(router)
  console.log(id)

  // Get exercise
  const { isLoading, data, isError, error } = useExerciseData(id, onSuccess, onError);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
    console.log(`log of id; ${data?.data.id}`)
  }
  
  return (
    <ExerciseItem exercise={data} />
  )
}