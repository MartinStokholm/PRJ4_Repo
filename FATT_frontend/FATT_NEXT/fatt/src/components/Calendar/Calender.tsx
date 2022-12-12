import LoadingSpinner from "../Layout/LoadingSpinner";
import { GetWorkoutsList } from "../../queries/WorkoutsUserspecific";
import { GetMealsList } from "../../queries/MealsUserspecific";
import WorkoutPlan from "../Calendar/WorkoutPlan";
import MealPlan from "../Calendar/MealPlan";
import SubHeading from "../Layout/SubHeading";
import Error from "next/error";

const onSuccess = (WorkoutData) => {
  console.log("Perform side effect after data fetching", WorkoutData?.data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function Calender({ calendarData }) {
  const {
    isLoading,
    data: workoutData,
    isError,
    error,
  } = GetWorkoutsList(onSuccess, onError);

  const { data: mealData } = GetMealsList(onSuccess, onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={(error as any).message} />;
  }

  {
    /* workoutDays children are day and workoutId */
  }
  const workoutDays = calendarData?.workoutDays;
  const mealDays = calendarData?.mealDays;

  return (
    <div className="md:flex border rounded border-grey-300 bg-white overflow-hidden shadow-lg ">
      <div className="m-4">
        <SubHeading text="Workout Plan" />
        <WorkoutPlan workoutDays={workoutDays} workoutData={workoutData} />
      </div>

      <div className="m-4">
        <SubHeading text="Meal Plan" />
        <MealPlan mealDays={mealDays} mealData={mealData} />
      </div>
    </div>
  );
}
