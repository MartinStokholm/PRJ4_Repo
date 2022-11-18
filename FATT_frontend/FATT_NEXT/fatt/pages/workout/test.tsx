import { useMutation } from "react-query";
import {
  addWorkout,
  useAddWorkoutData,
} from "../../src/mutation/workout/PostWorkout";
import { useState } from "react";
import Button from "../../src/components/Button";
import {
  updateWorkout,
  useUpdateWorkoutData,
} from "../../src/mutation/workout/PutWorkout";
import { useDeleteWorkoutData } from "../../src/mutation/workout/DeleteWorkout";
import {
  addExercisesToWorkout,
  useAddExercisesToWorkoutData,
} from "../../src/mutation/workout/PostWorkoutAddExerciseList";
import { getExercisesList } from "../../src/queries/Exercises";
import { useUpdateWorkoutAddExerciseData } from "../../src/mutation/workout/PutWorkoutAddExercise";

const onSuccess = () => {
  {
    /* Maybe we only should show data if success*/
  }

  console.log("Perform side effect after data fetching");
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};

export default function TestPage() {
  const { data: ExerciseData } = getExercisesList(onSuccess, onError);

  const [workoutId, setWorkoutId] = useState();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [exercisesIds, setExerciseIds] = useState("");
  const [exerciseId, setExerciseId] = useState();
  // I Get server error if we don't give id, maybe it works on real server without
  //const id = "44";
  const { mutate: addWorkout } = useAddWorkoutData();
  const { mutate: updateWorkout } = useUpdateWorkoutData();
  const { mutate: deleteWorkout } = useDeleteWorkoutData();
  const { mutate: addExercisesToWorkout } = useAddExercisesToWorkoutData();
  const { mutate: updateWorkoutAddExercise } =
    useUpdateWorkoutAddExerciseData();

  const handleAddWorkoutClick = () => {
    console.log({ name, duration, exercisesIds });

    const workout = { name, duration, exercisesIds };
    addWorkout(workout);
  };

  const handleUpdateWorkoutClick = () => {
    console.log({ workoutId, name, duration, exercisesIds });

    const workout = { workoutId, name, duration, exercisesIds };
    updateWorkout(workout);
  };

  // Need to make a array builder, because the data that is tranfered over
  // is a list of numbers
  const handleaddExercisesToWorkoutClick = () => {
    console.log({ workoutId, exercisesIds });

    const workout = { workoutId, exercisesIds };
    addExercisesToWorkout(workout);
  };

  const handleUpdateWorkoutAddExerciseClick = () => {
    console.log({ workoutId, exerciseId });

    const workout = { workoutId, exerciseId };
    updateWorkoutAddExercise(workout);
  };

  const handleDeleteWorkoutClick = () => {
    console.log({ workoutId, name, duration, exercisesIds });

    const workout = { workoutId, name, duration, exercisesIds };
    deleteWorkout(workout);
  };

  return (
    <>
      <input
        type="text"
        placeholder="workoutId"
        value={workoutId}
        onChange={(e) => setWorkoutId(e.target.value)}
      />
      <input
        type="text"
        value={name}
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={duration}
        placeholder="duration"
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="exercisesIds"
        value={exercisesIds}
        onChange={(e) => setExerciseIds(e.target.value)}
      />
      <input
        type="text"
        value={exerciseId}
        placeholder="exerciseId"
        onChange={(e) => setExerciseId(e.target.value)}
      />
      <Button onClick={handleAddWorkoutClick} text={"Add"} />
      <Button onClick={handleUpdateWorkoutClick} text={"Update"} />
      <Button onClick={handleDeleteWorkoutClick} text={"Delete"} />
      <Button
        onClick={handleaddExercisesToWorkoutClick}
        text={"Add Exercises To Workout"}
      />
      <Button
        onClick={handleUpdateWorkoutAddExerciseClick}
        text={"Add Exercise To Workout"}
      />
      <div></div>
    </>
  );
}
