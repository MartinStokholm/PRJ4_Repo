import LoadingSpinner from "../../src/components/LoadingSpinner";
import DishList from "../../src/components/DishList";
import { useDishsData } from "../../src/hooks/useDishsData";
import Error from "next/error";
const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function ExercisePage() {
  const { isLoading, data, isError, error, isFetching, refetch } = useDishsData(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={error.message} />;
  }
  return <DishList data={data} />;
}
