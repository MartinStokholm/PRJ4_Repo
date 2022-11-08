import { useMutation } from "react-query";
import { addWorkout, useAddWorkoutData } from "../../src/mutation/PostWorkout";
import { useState } from "react";
import Button from "../../src/components/Button";
import {
  updateWorkout,
  useUpdateWorkoutData,
} from "../../src/mutation/PutWorkout";
import { useDeleteWorkoutData } from "../../src/mutation/DeleteWorkout";
import {
  addExercisesToWorkout,
  useAddExercisesToWorkoutData,
} from "../../src/mutation/PostWorkoutAddExerciseList";

export default function TestPage() {
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [exercisesIds, setExerciseIds] = useState("");
  const [exercisesId, setExerciseId] = useState();
  // I Get server error if we don't give id, maybe it works on real server without
  //const id = "44";
  const { mutate: addWorkout } = useAddWorkoutData();
  const { mutate: updateWorkout } = useUpdateWorkoutData();
  const { mutate: deleteWorkout } = useDeleteWorkoutData();
  const { mutate: addExercisesToWorkout } = useAddExercisesToWorkoutData();

  const handleAddWorkoutClick = () => {
    console.log({ name, duration, exercisesIds });

    const workout = { name, duration, exercisesIds };
    addWorkout(workout);
  };

  const handleUpdateWorkoutClick = () => {
    console.log({ id, name, duration, exercisesIds });

    const workout = { id, name, duration, exercisesIds };
    updateWorkout(workout);
  };

  const handleaddExercisesToWorkoutClick = () => {
    console.log({ id, name, duration, exercisesIds });

    const workout = { id, name, duration, exercisesIds };
    addExercisesToWorkout(workout);
  };

  const handleDeleteWorkoutClick = () => {
    console.log({ id, name, duration, exercisesIds });

    const workout = { id, name, duration, exercisesIds };
    deleteWorkout(workout);
  };

  return (
    <>
      <input
        type="text"
        placeholder="workoutId"
        value={id}
        onChange={(e) => setId(e.target.value)}
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
        value={exercisesId}
        placeholder="exercisesId"
        onChange={(e) => setExerciseId(e.target.value)}
      />
      <Button onClick={handleAddWorkoutClick} text={"Add"} />
      <Button onClick={handleUpdateWorkoutClick} text={"Update"} />
      <Button onClick={handleDeleteWorkoutClick} text={"Delete"} />
      <Button
        onClick={handleaddExercisesToWorkoutClick}
        text={"Add Exercises To Workout"}
      />
      <div></div>
    </>
  );
}
