import InputButton from "../Button/InputButton";
import { useUpdateMealToCalendar } from "../../mutation/meal/PutMealToCalendar";
import { MealAddToCalendar } from "../../../interfaces/Meal";
import { useState } from "react";
import DropdownButton from "../Button/DropdownButton";
import Dropdown from "../util/Dropdown";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import Dropdown from "react-dropdown";

const AddMealToCalendarModal = ({ id }) => {
  const [mealId, setMealId] = useState();
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
      <h1 className="mb-2 font-bold">Add Meal to calendar </h1>
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

export default AddMealToCalendarModal;
