import InputButton from "../../Button/InputButton";
import InputField from "../../InputField";
import { useAddWorkout } from "../../../mutation/workout/PostWorkout";
import { WorkoutCreateNoIdDto } from "../../../../interfaces/Workout";
import { useState } from "react";

const WorkoutModal = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDurantion] = useState("");
  const { mutate: workout } = useAddWorkout();

  const handleCreateButtonClick = () => {
    console.log("Create workout");
    const workoutDto: WorkoutCreateNoIdDto = {
      name: workoutName,
      duration: duration,
    };
    workout(workoutDto);
  };

  return (
    <div className="bg-gradient-to-b from-green-200 ">
      <h1 className="py-2 px-10 font-bold">Create a workout</h1>
      <form
        onSubmit={handleCreateButtonClick}
        className="flex flex-col justify-center bg-white"
      >
        <InputField
          type="text"
          placeholder="Workout Name"
          onChange={(e) => setWorkoutName(e.target.value)}
          value={undefined}
          
          required
        />
        <InputField
          type="text"
          placeholder="Duration"
          onChange={(e) => setDurantion(e.target.value)}
          value={undefined}
          required
          
        />
        <InputButton onClick={handleCreateButtonClick} text={"Create"} />
      </form>
    </div>
  );
};

export default WorkoutModal;
