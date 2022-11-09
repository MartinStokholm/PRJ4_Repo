import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import Link from "next/link";

const WorkoutList = ({ workoutData, exerciseData }) => {
  return (
    <>
      {/* This maps out all workouts with their exercise as names */}
      {workoutData.data?.map((workout) => (
        <div
          key={workout.name}
          className="hover:bg-green-50 rounded bg-white shadow-lg w-full md:w-1/3 m-4"
        >
          <Link
            href={{ pathname: `/workout/${workout.id}` }}
            key={workout.id}
            className="mt-4"
          >
            <h1 className="mt-4 font-bold">{workout.name}</h1>
            <h2 className="italic">{workout.duration}</h2>

            {exerciseData?.data.map((exercise) =>
              workout.exercisesIds.includes(exercise.id) ? (
                <div
                  key={exercise.id}
                  className="bg-white overflow-hidden shadow-lg mx-4 my-4"
                >
                  <WorkoutItemThumbnail exercise={exercise} />
                </div>
              ) : null
            )}
          </Link>
        </div>
      ))}
    </>
  );
};

export default WorkoutList;
