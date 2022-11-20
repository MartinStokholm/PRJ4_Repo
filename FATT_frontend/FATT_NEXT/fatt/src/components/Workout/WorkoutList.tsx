import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import Link from "next/link";
import DeleteButton from "../Button/DeleteButton";
import { useDeleteWorkout } from "../../mutation/workout/DeleteWorkout";

const WorkoutList = ({ workoutData, exerciseData }) => {
  const handleDeleteButtonClick = (workoutId: number) => {
    deleteWorkout(workoutId);
  };
  const { mutate: deleteWorkout } = useDeleteWorkout();

  return (
    <>
      {/* This maps out all workouts with their exercise as names */}
      {workoutData.data?.map((workout) => (
        <div
          key={workout.name}
          className="hover:bg-green-50 rounded bg-white shadow-lg w-full md:w-1/3 m-4"
        >
          <DeleteButton
            text={"Delete"}
            onClick={() => {
              handleDeleteButtonClick(workout.id);
            }}
          />
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
