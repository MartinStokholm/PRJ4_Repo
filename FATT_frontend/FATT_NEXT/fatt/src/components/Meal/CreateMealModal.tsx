import InputButton from "../Button/InputButton";
import InputField from "../InputField";
import { useDeleteMeal } from "../../mutation/meal/DeleteMeal";
import { useAddMeal } from "../../mutation/meal/PostMeal";
import { MealCreateNoIdDto } from "../../../interfaces/Meal";
import { useState } from "react";

const MealModal = () => {
  const [mealName, setMealName] = useState("");
  const { mutate: meal } = useAddMeal();

  const handleCreateButtonClick = () => {
    console.log("Create Meal");
    const mealDto: MealCreateNoIdDto = {
      Name: mealName,
    };
    meal(mealDto);
  };

  const { mutate: deleteMeal } = useDeleteMeal();
  return (
    <div className="bg-gradient-to-b from-green-200 ">
      <h1 className="py-2 px-10 font-bold">Create a meal</h1>
      <form
        onSubmit={handleCreateButtonClick}
        className="flex flex-col justify-center bg-white"
      >
        <InputField
          type="text"
          placeholder="Meal Name"
          onChange={(e) => setMealName(e.target.value)}
          value={undefined}
          required
        />

        <InputButton
          onClick={handleCreateButtonClick}
          type={"submit"}
          text={"Create"}
          key={undefined}
        />
      </form>
    </div>
  );
};

export default MealModal;
