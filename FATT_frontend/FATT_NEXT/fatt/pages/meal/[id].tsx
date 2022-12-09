import { getMeal } from "../../src/queries/Meal";
import getDishesList from "../../src/queries/Dishs";
import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import { useUpdateMealAddDishData } from "../../src/mutation/meal/PutMealAddDish";
import { useRouter } from "next/router";
import MealItem from "../../src/components/Meal/Mealtem";
import Error from "next/error";
import { useEffect, useState } from "react";

const onSuccess = () => {
  console.log("Perform side effect after data fetching");
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function MealPage() {
  // Get dishes and meals
  const {
    isLoading,
    data: mealData,
    isError,
    error,
  } = getMeal(useRouter().query.id as string);

  const { data: dishData } = getDishesList(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={(error as any).message} />;
  }

  return (
    <div>
      <MealItem mealData={mealData} dishData={dishData} />
    </div>
  );
}
