import { getMeal } from "../../src/queries/Meal";
import getDishesList from "../../src/queries/Dishs";
import LoadingSpinner from "../../src/components/Layout/LoadingSpinner";
import { useUpdateMealAddDishData } from "../../src/mutation/meal/PutMealAddDish";
import { useRouter } from "next/router";
import MealItem from "../../src/components/Meal/Mealtem";
import Error from "next/error";
import { useEffect, useState } from "react";

export default function MealPage() {
  // Get dishes and meals
  const {
    isLoading,
    data: mealData,
    isError,
    error,
  } = getMeal(useRouter().query.id as string);
  const { data: dishData } = getDishesList();

  // Handler for when button is clicked. We send a request to add or remove a specific exercise to/from workout
  const handleAddButtonClick = (dishId) => {
    const data = { mealId, dishId };
    console.log(data);
    updateMealAddDish(data);
  };

  // Function call need to mutate date (PUT)
  const { mutate: updateMealAddDish } = useUpdateMealAddDishData();

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
