import InputButton from "../../Button/InputButton";
import { useDeleteWorkout } from "../../../mutation/workout/DeleteWorkout";
import { useUpdateWorkoutToCalendar } from "../../../mutation/workout/PutWorkoutToCalendar";
import { WorkoutAddToCalendar } from "../../../../interfaces/Workout";
import { useState } from "react";
import DropdownButton from "../../Button/DropdownButton";
import Dropdown from "../../util/Dropdown";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AddWorkoutToCalendarModal = ({ id, onClose }) => {
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
    onClose();
  };

  const handleMenu = (day: string) => {
    console.log("day");
    setDay(day);
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
    <div className="bg-gradient-to-b from-green-200 ">
      <h1 className="py-2 px-10 font-bold">Add workout to calendar </h1>
      <form onSubmit={handleButtonClick} className="flex flex-col bg-white">
        <Dropdown
          trigger={
            <button className="m-2 flex justify-center items-center">
              {day}
              <ChevronDownIcon className="m-2 h-10 w-10" />
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
        <div>
          <InputButton onClick={handleButtonClick} text={"Add"} />
        </div>
      </form>
    </div>
  );
};

export default AddWorkoutToCalendarModal;
