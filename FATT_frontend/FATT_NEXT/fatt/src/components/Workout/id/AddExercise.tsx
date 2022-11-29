import Button from "../../Button/Button";
import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import { useRouter } from "next/router";
import { useUpdateWorkoutAddExerciseData } from "../../../mutation/workout/PutWorkoutAddExercise";

const AddExercise = ({ workoutData, exerciseData }) => {
  const workoutId = useRouter().query.id;

  const handleAddButtonClick = (exerciseId) => {
    updateWorkoutAddExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutAddExercise } =
    useUpdateWorkoutAddExerciseData();

  return (
    <div className="bg-gradient-to-b from-green-200">
      <h1 className="mt-4 font-bold">All exercises</h1>
      <h2 className="italic pb-4 px-2">
        That you can add to the workout: {workoutData?.data?.name}
      </h2>
      <div className="bg-white pt-2">
        {exerciseData?.data.map((exercise) =>
          workoutData?.data?.exercisesIds?.includes(exercise.id) ? null : (
            <div
              key={exercise.id}
              className="bg-white overflow-hidden shadow-lg mx-4 my-4 flex"
            >
              <Button
                text={"Add"}
                onClick={() => {
                  handleAddButtonClick(exercise.id);
                }}
                key={undefined}
              />
              <WorkoutItemThumbnail exercise={exercise} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AddExercise;
