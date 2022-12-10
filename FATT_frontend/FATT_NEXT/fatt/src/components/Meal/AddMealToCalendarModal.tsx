import InputButton from "../Button/InputButton";
import { useUpdateMealToCalendar } from "../../mutation/meal/PutMealToCalendar";
import { MealAddToCalendar } from "../../../interfaces/Meal";
import { useState } from "react";
import DropdownButton from "../Button/DropdownButton";
import Dropdown from "../util/Dropdown";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const AddMealToCalendarModal = ({ id, onClose }) => {
  const [day, setDay] = useState("Select an option");
  const [open, setOpen] = useState(false);
  const { mutate: updateMealToCalendar } = useUpdateMealToCalendar();

  const handleButtonClick = () => {
    const mealDto: MealAddToCalendar = {
      mealId: id,
      day: day,
      email: localStorage.getItem("email"),
    };

    updateMealToCalendar(mealDto);
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
    <div className="bg-gradient-to-b from-green-200 ">
      <h1 className="py-2 px-10 font-bold">Add Meal to calendar </h1>
      <form
        onSubmit={handleButtonClick}
        className="flex flex-col justify-center bg-white"
      >
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
        <InputButton onClick={handleButtonClick} text={"Add"} />
      </form>
    </div>
  );
};

//          onChange={}

export default AddMealToCalendarModal;
