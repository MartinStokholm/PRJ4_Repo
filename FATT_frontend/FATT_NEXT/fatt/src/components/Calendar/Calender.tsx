import LoadingSpinner from "../Layout/LoadingSpinner";
import { getWorkoutsList } from "../../queries/WorkoutsUserspecific";
import WorkoutPlan from "../Calendar/WorkoutPlan";
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

  console.log(calendarData);
  console.log({ workoutDays });
  return (
    <>
      <div className="border rounded border-green-500 p-4">
        <h1>Workout plan</h1>
        <WorkoutPlan workoutDays={workoutDays} workoutData={workoutData} />
      </div>
    </>
  );
}
