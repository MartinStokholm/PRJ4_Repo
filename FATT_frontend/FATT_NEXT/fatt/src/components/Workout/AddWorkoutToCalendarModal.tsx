import InputButton from "../Button/InputButton";
import { useDeleteWorkout } from "../../mutation/workout/DeleteWorkout";
import { useUpdateWorkoutToCalendar } from "../../mutation/workout/PutWorkoutToCalendar";
import { WorkoutAddToCalendar } from "../../../interfaces/Workout";
import { useState } from "react";
import DropdownButton from "../Button/DropdownButton";
import Dropdown from "../util/Dropdown";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
      <h1 className="mb-2 font-bold">Add workout to calendar </h1>
      <form
        onSubmit={handleButtonClick}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        <Dropdown
          trigger={
            <button>
              {day}{" "}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
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
