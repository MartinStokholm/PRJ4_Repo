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
import { useExercisesData } from "../../src/hooks/useExercisesData";
import { useUpdateWorkoutAddExerciseData } from "../../src/mutation/PutWorkoutAddExercise";

export default function TestPage() {
  const { data: ExerciseData } = useExercisesData();

  const [id, setId] = useState();
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
    console.log({ id, name, duration, exercisesIds });

    const workout = { id, name, duration, exercisesIds };
    updateWorkout(workout);
  };

  // Need to make a array builder, because the data that is tranfered over
  // is a list of numbers
  const handleaddExercisesToWorkoutClick = () => {
    console.log({ id, exercisesIds });

    const workout = { id, exercisesIds };
    addExercisesToWorkout(workout);
  };

  const handleUpdateWorkoutAddExerciseClick = () => {
    console.log({ id, exerciseId });

    const workout = { id, exerciseId };
    updateWorkoutAddExercise(workout);
  };

  const handleDeleteWorkoutClick = () => {
    console.log({ id, name, duration, exercisesIds });

    const workout = { id, name, duration, exercisesIds };
    deleteWorkout(workout);
  };

  return (
    <div>
      <div className="py-4 px-8">
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
          value={exerciseId}
          placeholder="exerciseId"
          onChange={(e) => setExerciseId(e.target.value)}
        />
      </div>
      <div className="py-4 px-8">
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
      </div>
    </div>
  );
}
