import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import { useRouter } from "next/router";
import DeleteButton from "../../Button/DeleteButton";
import { useUpdateWorkoutRemoveExercise } from "../../../mutation/workout/PutWorkoutRemoveExercise";

const RemoveExercise = ({ exerciseData, workoutData }) => {
  const workoutId = useRouter().query.id;

  const handleRemoveButtonClick = (exerciseId) => {
    updateWorkoutRemoveExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutRemoveExercise } =
    useUpdateWorkoutRemoveExercise();

  return (
    <>
      {exerciseData?.data.map((exercise) =>
        workoutData?.data?.exercisesIds?.includes(exercise.id) ? (
          <div
            key={exercise.id}
            className="bg-white overflow-hidden shadow-lg mx-4 my-4 flex"
          >
            <DeleteButton
              text={"Remove"}
              onClick={() => {
                handleRemoveButtonClick(exercise.id);
              }}
            />
            <WorkoutItemThumbnail exercise={exercise} />
          </div>
        ) : null
      )}
    </>
  );
};

export default RemoveExercise;
