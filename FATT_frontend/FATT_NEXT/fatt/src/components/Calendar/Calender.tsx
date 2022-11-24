import LoadingSpinner from "../Layout/LoadingSpinner";
import { getWorkoutsList } from "../../queries/WorkoutsUserspecific";
import { getMealsList } from "../../queries/MealsUserspecific";
import WorkoutPlan from "../Calendar/WorkoutPlan";
import MealPlan from "../Calendar/MealPlan";

import Error from "next/error";
const onSuccess = (WorkoutData) => {
  console.log("Perform side effect after data fetching", WorkoutData?.data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function Calender({ calendarData }) {
  const {
    isLoadingWorkout,
    data: workoutData,
    isErrorWorkout,
    errorWorkout,
  } = getWorkoutsList(onSuccess, onError);

  const {
    isLoadingMeal,
    data: mealData,
    isErrorMeal,
    errorMeal,
  } = getMealsList(onSuccess, onError);

  if (isLoadingWorkout || isLoadingMeal) {
    return <LoadingSpinner />;
  }

  if (isErrorWorkout || isErrorMeal) {
    return <Error statusCode={(error as any).message} />;
  }

  {
    /* workoutDays children are day and workoutId */
  }
  const workoutDays = calendarData?.workoutDays;
  const mealDays = calendarData?.mealDays;

  console.log(calendarData);
  console.log({ workoutDays });
  console.log({ mealDays });

  return (
    <>
      <div className="border rounded border-green-500 p-4">
        <h1>Workout plan</h1>
        <WorkoutPlan workoutDays={workoutDays} workoutData={workoutData} />
        <h1>Meal plan</h1>
        <MealPlan mealDays={mealDays} mealData={mealData} />
      </div>
    </>
  );
}
