import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import Link from "next/link";
import DeleteButton from "../Button/DeleteButton";
import InputButton from "../Button/InputButton";
import { useDeleteWorkout } from "../../mutation/workout/DeleteWorkout";
import { TextInput } from "flowbite-react";
import { useAddWorkout } from "../../mutation/workout/PostWorkout";
import { WorkoutCreateNoIdDto } from "../../../interfaces/Workout";
import { useState } from "react";

const WorkoutList = ({ workoutData, exerciseData }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDurantion] = useState("");
  const { mutate: workout } = useAddWorkout();
  const handleCreateButtonClick = () => {
    const workoutDto: WorkoutCreateNoIdDto = {
      name: workoutName,
      duration: duration,
    };
    workout(workoutDto);
  };

  const handleDeleteButtonClick = (workoutId: number) => {
    deleteWorkout(workoutId);
  };
  const { mutate: deleteWorkout } = useDeleteWorkout();

  return (
    <>
      <form onSubmit={handleCreateButtonClick} className="flex">
        <TextInput
          type="text"
          placeholder="newWorkoutName"
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <TextInput
          type="text"
          placeholder="workoutDuration"
          onChange={(e) => setDurantion(e.target.value)}
        />
        <InputButton type={"submit"} text={"Create"} key={undefined} />
      </form>
      <div className="flex flex-wrap">
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
                workout?.exercisesIds?.includes(exercise.id) ? (
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
      </div>
    </>
  );
};

export default WorkoutList;
