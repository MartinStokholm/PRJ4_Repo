import React from "react";
import Link from "next/link";

const WorkoutPlan = ({ workoutDays, workoutData }) => {
  return (
    <div className="flex flex-wrap justify-center border rounded border-green-500 pt-4">
      {workoutDays?.map((workoutDay) => (
        <div key={workoutDay.id} className="border rounded m-2">
          <h1>{workoutDay.day}</h1>
          {workoutData?.data?.map((workout) => {
            {
              /*match workoutDays.workoutId with workout id from users workouts*/
            }
            if (workout.id === workoutDay.workoutId) {
              return (
                <div key={workout.id}>
                  <div className="flex flex-col justify-center ">
                    <Link
                      href={{ pathname: `/workout/${workout.id}` }}
                      key={workout.id}
                      className="hover:bg-green-50 hover:shadow-inner flex justify-center"
                    >
                      <h1 className="m-2 font-bold py-1">{workout.name}</h1>

                      <h2 className="m-2 italic py-1">{workout.duration}</h2>
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlan;
