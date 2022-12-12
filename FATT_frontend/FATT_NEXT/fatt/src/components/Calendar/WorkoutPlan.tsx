import React from "react";
import Link from "next/link";
import WorkoutPlanColoumn from "./WorkoutPlanColoumn";

const WorkoutPlan = ({ workoutDays, workoutData }) => {
  console.log({ workoutDays });
  console.log({ workoutData });
  return (
    <div className="flex md:flex-wrap flex-col justify-center bg-white overflow-hidden shadow-lg p-2">
      <WorkoutPlanColoumn
        workoutDays={workoutDays}
        workoutData={workoutData}
        day="Monday"
      />
      <WorkoutPlanColoumn
        workoutDays={workoutDays}
        workoutData={workoutData}
        day="Tuesday"
      />
      <WorkoutPlanColoumn
        workoutDays={workoutDays}
        workoutData={workoutData}
        day="Wednesday"
      />
      <WorkoutPlanColoumn
        workoutDays={workoutDays}
        workoutData={workoutData}
        day="Thursday"
      />
      <WorkoutPlanColoumn
        workoutDays={workoutDays}
        workoutData={workoutData}
        day="Friday"
      />
      <WorkoutPlanColoumn
        workoutDays={workoutDays}
        workoutData={workoutData}
        day="Saturday"
      />
      <WorkoutPlanColoumn
        workoutDays={workoutDays}
        workoutData={workoutData}
        day="Sunday"
      />
    </div>
  );
};

export default WorkoutPlan;
