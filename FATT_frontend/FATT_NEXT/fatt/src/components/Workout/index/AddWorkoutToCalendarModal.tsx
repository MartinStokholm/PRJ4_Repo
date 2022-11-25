import InputButton from "../../Button/InputButton";
import { useDeleteWorkout } from "../../../mutation/workout/DeleteWorkout";
import { useUpdateWorkoutToCalendar } from "../../../mutation/workout/PutWorkoutToCalendar";
import { WorkoutAddToCalendar } from "../../../../interfaces/Workout";
import { useState } from "react";
import DropdownButton from "../../Button/DropdownButton";
import Dropdown from "../../util/Dropdown";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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

  return (
    <div>
      <h1 className="mb-2 font-bold">Add workout to calendar </h1>
      <form onSubmit={handleButtonClick} className="flex">
        <Dropdown
          trigger={
            <button className="flex flex-inline md:justify-between min-h-fit m-4">
              {day}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" />
            </button>
          }
          menu={options.map((day, index) => (
            <DropdownButton
              onClick={() => handleMenu(day)}
              text={day}
              key={index}
            />
          ))}
        />

        <InputButton onClick={handleButtonClick} text={"Add"} />
      </form>
    </div>
  );
};

export default AddWorkoutToCalendarModal;
