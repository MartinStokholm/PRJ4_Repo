import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import { getMealsList } from "../../src/queries/MealsUserspecific";
import getDishsList from "../../src/queries/Dishs";
import MealList from "../../src/components/Meal/MealList";
import Error from "next/error";
const onSuccess = (mealData, dishData) => {
  {
    /* Maybe we only should show data if success*/
  }

  console.log("Perform side effect after data fetching", dishData);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function MealPage() {
  const {
    isLoading,
    data: mealData,
    isError,
    error,
  } = getMealsList(onSuccess, onError);

  const { data: dishData } = getDishsList(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={(error as any).message} />;
  }

  return <MealList mealData={mealData} dishData={dishData} />;
}
