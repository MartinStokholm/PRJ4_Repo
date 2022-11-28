import InputButton from "../../Button/InputButton";
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
    <div className="bg-gradient-to-b from-green-200">
      <h1 className="py2 px-10 font-bold">Add workout to calendar </h1>
      <form
        onSubmit={handleButtonClick}
        className="flex flex-col justify-center bg-white"
      >
        <Dropdown
          trigger={
            <button className="mx-2 flex justify-center items-center">
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
        <InputButton onClick={handleButtonClick} text={"Add"} />
      </form>
    </div>
  );
};

export default AddWorkoutToCalendarModal;
