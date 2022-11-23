import InputButton from "../Button/InputButton";
import InputField from "../InputField";
import { useDeleteWorkout } from "../../mutation/workout/DeleteWorkout";
import { useUpdateWorkoutToCalendar } from "../../mutation/workout/PutWorkoutToCalendar";
import { WorkoutAddToCalendar } from "../../../interfaces/Workout";
import { useState } from "react";

const AddWorkoutToCalendarModal = ({ id }) => {
  const [workoutId, setWorkoutId] = useState();
  const [day, setDay] = useState("");
  const { mutate: updateWorkoutToCalendar } = useUpdateWorkoutToCalendar();

  const handleButtonClick = () => {
    console.log(id);
    const workoutDto: WorkoutAddToCalendar = {
      workoutId: id,
      day: day,
      email: localStorage.getItem("email"),
    };

    updateWorkoutToCalendar(workoutDto);
  };

  //   const { mutate: deleteWorkout } = useDeleteWorkout();
  return (
    <div>
      <h1 className="mb-2 font-bold">Add workout to calendar</h1>
      <form
        onSubmit={handleButtonClick}
        className="flex flex-wrap border rounded bg-grey-200 justify-center"
      >
        <InputField
          type="text"
          placeholder="Day"
          onChange={(e) => setDay(e.target.value)}
          value={undefined}
          required
        />
        <InputButton
          onClick={handleButtonClick}
          type={"submit"}
          text={"Add"}
          key={undefined}
        />
      </form>
    </div>
  );
};

export default AddWorkoutToCalendarModal;
