import React from "react";
import Link from "next/link";
import { Sorting } from "./Sorting.js";

const WorkoutPlanColoumn = ({ workoutDays, workoutData, day }) => {
  var Day = Sorting(workoutDays, day);

  return (
    <div className="m-4 border-t-2 border-b-2 rounded border-green-200">
      <h1 className="p-2 border-b-2 border-green-100">{day}</h1>
      {Day?.map((workoutId) => {
        const workout = workoutData?.data?.find(
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
