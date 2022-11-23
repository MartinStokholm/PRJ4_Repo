import InputButton from "../Button/InputButton";
import { useDeleteWorkout } from "../../mutation/workout/DeleteWorkout";
import { useUpdateWorkoutToCalendar } from "../../mutation/workout/PutWorkoutToCalendar";
import { WorkoutAddToCalendar } from "../../../interfaces/Workout";
import { useState } from "react";
import DropdownButton from "../Button/DropdownButton";
import Dropdown from "../util/Dropdown";
// import Dropdown from "react-dropdown";

const AddWorkoutToCalendarModal = ({ id }) => {
  const [workoutId, setWorkoutId] = useState();
  const [day, setDay] = useState("Select an option");
  const [open, setOpen] = useState(false);
  const { mutate: updateWorkoutToCalendar } = useUpdateWorkoutToCalendar();

  const handleButtonClick = () => {
    const workoutDto: WorkoutAddToCalendar = {
      workoutId: id,
      day: day,
      email: localStorage.getItem("email"),
    };

    updateWorkoutToCalendar(workoutDto);
  };

  const handleMenu = (day: string) => {
    console.log("day");
    setDay(day);
    setOpen(false);
  };

  const options = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const defaultOption = options[0];

  //   const { mutate: deleteWorkout } = useDeleteWorkout();
  return (
    <div>
      <h1 className="mb-2 font-bold">Add workout to calendar</h1>
      <form
        onSubmit={handleButtonClick}
        className="flex flex-wrap border rounded bg-grey-200 justify-center"
      >
        <Dropdown
          trigger={<button>{day}</button>}
          menu={options.map((day, index) => (
            <DropdownButton
              onClick={() => handleMenu(day)}
              text={day}
              key={index}
            />
          ))}
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

//          onChange={}

export default AddWorkoutToCalendarModal;
