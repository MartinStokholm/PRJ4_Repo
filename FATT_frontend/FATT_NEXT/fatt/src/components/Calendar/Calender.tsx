import LoadingSpinner from "../Layout/LoadingSpinner";
import { getWorkoutsList } from "../../queries/WorkoutsUserspecific";
import { getMealsList } from "../../queries/MealsUserspecific";
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
  } = getWorkoutsList(onSuccess, onError);

  const { data: mealData } = getMealsList(onSuccess, onError);

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

  console.log(calendarData);
  console.log({ workoutDays });
  console.log({ mealDays });

  return (
    <div className="flex flex-col border rounded border-grey-300 bg-white overflow-hidden shadow-lg ">
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
