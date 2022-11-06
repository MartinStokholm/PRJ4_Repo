import Button from "../../src/components/Button";
import ExerciseList from "../../src/components/ExerciseList";
import {useExercisesData} from "../../src/hooks/useExercisesData";

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
      
      <Button text={"Get exercise"} onClick={refetch} />

      <ExerciseList data={data} />

    </div>
  );
}
