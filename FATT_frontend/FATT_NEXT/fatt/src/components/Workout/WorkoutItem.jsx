import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import MyButton from "../Button/Button";
import { useUpdateWorkoutRemoveExercise } from "../../mutation/workout/PutWorkoutRemoveExercise";
import { useRouter } from "next/router";

const WorkoutItem = ({ workoutData, exerciseData }) => {
  // State for exercise id
  const workoutId = useRouter().query.id;

  const handleRemoveButtonClick = (exerciseId) => {
    updateWorkoutRemoveExercise({ workoutId, exerciseId });
  };

  const { mutate: updateWorkoutRemoveExercise } =
    useUpdateWorkoutRemoveExercise();

  return (
    <>
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
              <MyButton
                text={"Remove"}
                onClick={() => {
                  handleRemoveButtonClick(exercise.id);
                }}
              />
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default WorkoutItem;
