import LoadingSpinner from "../../src/components/LoadingSpinner";
import { useMealData } from "../../src/hooks/useMealData";
import { useDishData } from "../../src/hooks/useDishData";
import MealList from "../../src/components/MealList";
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
  const { isLoading, data: mealData, isError, error } = useMealData();

  const { data: dishData } = useDishData(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={error.message} />;
  }

  return <MealList mealData={mealData} dishData={dishData} />;
}
