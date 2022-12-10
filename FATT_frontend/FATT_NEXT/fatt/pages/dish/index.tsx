import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import DishList from "../../src/components/Dish/DishList";
import { getDishsList } from "../../src/queries/Dishs";
import Error from "next/error";
const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function ExercisePage() {
  const { isLoading, data, isError, error, isFetching, refetch } = getDishsList(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
  }
  return <DishList data={data} />;
}
