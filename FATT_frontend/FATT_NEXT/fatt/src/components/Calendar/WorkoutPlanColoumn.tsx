import React from "react";
import Link from "next/link";

const WorkoutPlanColoumn = ({ workoutDays, workoutData, day }) => {
  switch (day) {
    case "Monday":
      var Day = workoutDays?.monday;
      break;
    case "Tuesday":
      var Day = workoutDays?.tuesday;
      break;
    case "Wednesday":
      var Day = workoutDays?.wednesday;
      break;
    case "Thursday":
      var Day = workoutDays?.thursday;
      break;
    case "Friday":
      var Day = workoutDays?.friday;
      break;
    case "Saturday":
      var Day = workoutDays?.saturday;
      break;
    case "Sunday":
      var Day = workoutDays?.sunday;
      break;
    default:
      break;
  }

  return (
    <div className="m-4 border-t-2 border-b-2 rounded border-green-200 p-2">
      <h1>{day}</h1>
      {Day?.map((workoutId) => {
        const workout = workoutData?.data.find(
          (workout) => workout.id === workoutId
        );
        return (
          <div key={workoutId} className="flex flex-col">
            <Link href={`/workout/${workoutId}`}>
              <h1 className="text-green-400 hover:bg-green-100 hover:italic hover:border-l-8 hover:border-green-500 px-2 py-1 rounded-r">
                {workout?.name}
              </h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutPlanColoumn;
