import { useState } from "react";
import InputButton from "../Button/InputButton";
import InputField from "../InputField";
import { usePostDish } from "../../mutation/dish/PostDish";
import { DishNoIdDto } from "../../../interfaces/Dish";

export default function DishModal() {
  const { mutate: dish } = usePostDish();
  const [dishName, setDishName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [nutritionalValue, setNutritionalValue] = useState("");
  const [recipe, setRecipe] = useState("");
  const [PicturePath, setPicturePath] = useState("");

  const handleCreateButtonClick = (e) => {
    e.preventDefault();
    const dishNoIdDto: DishNoIdDto = {
      name: dishName,
      prepTime: prepTime,
      ingredients: ingredients,
      nutritionalValue: nutritionalValue,
      recipe: recipe,
      picturePath: PicturePath,
    };
    dish(dishNoIdDto);
  };

  return (
    <div className="bg-gradient-to-b from-green-200">
      <h3 className="text-xl font-semibold text-gray-900 m-4">Create dish</h3>
      <form
        onSubmit={handleCreateButtonClick}
        className="flex flex-col justify-center bg-white"
      >
        <div className="flex flex-col justify-center bg-white">
          <InputField
            type="text"
            placeholder="Name"
            onChange={(e) => setDishName(e.target.value)}
            value={undefined}
            required
          />
          <InputField
            type="text"
            placeholder="Prep Time"
            onChange={(e) => setPrepTime(e.target.value)}
            value={undefined}
            required
          />
          <InputField
            type="text"
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
            value={undefined}
            required
          />
          <InputField
            type="text"
            placeholder="Nutritional Value"
            onChange={(e) => setNutritionalValue(e.target.value)}
            value={undefined}
            required
          />
          <InputField
            type="text"
            placeholder="Recipe"
            onChange={(e) => setRecipe(e.target.value)}
            value={undefined}
            required
          />
          <InputField
            type="text"
            placeholder="PicturePath"
            onChange={(e) => setPicturePath(e.target.value)}
            value={undefined}
            required
          />
          <InputButton
            type={"onSubmit"}
            onClick={handleCreateButtonClick}
            text={"Create"}
            key={undefined}
          />
        </div>
      </form>
    </div>
  );
}
