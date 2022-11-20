import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import Button from "../Button/Button";
import DeleteButton from "../Button/DeleteButton";
import { useUpdateWorkoutRemoveExercise } from "../../mutation/workout/PutWorkoutRemoveExercise";
import { useRouter } from "next/router";
import { useUpdateWorkoutAddExerciseData } from "../../mutation/workout/PutWorkoutAddExercise";

const WorkoutItem = ({ workoutData, exerciseData }) => {
  // State for exercise id
  const workoutId = useRouter().query.id;

  const handleRemoveButtonClick = (exerciseId) => {
    updateWorkoutRemoveExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutRemoveExercise } =
    useUpdateWorkoutRemoveExercise();

  const handleAddButtonClick = (exerciseId) => {
    updateWorkoutAddExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutAddExercise } =
    useUpdateWorkoutAddExerciseData();

  return (
    <>
      <div className="flex">
        <div>
          <h1 className="mt-4 font-bold">{workoutData?.data?.name}</h1>
          <h2 className="italic">{workoutData?.data?.duration}</h2>

          {exerciseData?.data.map((exercise) =>
            workoutData?.data?.exercisesIds?.includes(exercise.id) ? (
              <div
                key={exercise.id}
                className="bg-white overflow-hidden shadow-lg mx-4 my-4"
              >
                <WorkoutItemThumbnail exercise={exercise} />
                <DeleteButton
                  text={"Remove"}
                  onClick={() => {
                    handleRemoveButtonClick(exercise.id);
                  }}
                />
              </div>
            ) : null
          )}
        </div>
        <div>
          <h1 className="mt-4 font-bold">Exercise list</h1>
          <h2 className="italic">Add exercise to workout</h2>

          {exerciseData?.data.map((exercise) =>
            workoutData?.data?.exercisesIds?.includes(exercise.id) ? null : (
              <div
                key={exercise.id}
                className="bg-white overflow-hidden shadow-lg mx-4 my-4"
              >
                <WorkoutItemThumbnail exercise={exercise} />
                {console.log("MIT ID ", exercise.id)}
                <Button
                  text={"Add"}
                  onClick={() => {
                    handleAddButtonClick(exercise.id);
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default WorkoutItem;
