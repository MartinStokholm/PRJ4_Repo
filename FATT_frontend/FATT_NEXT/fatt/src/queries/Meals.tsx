import type { Meals } from "../../interfaces/Meal";
import { useQuery } from "react-query";
import { request } from "../utils/axios";

const fecthMeals = async () => {
  const response = await request({ url: `meal/`, method: "get" });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const exercise = await response.data;
  //assertIsExercise(exercise);

  return response;
};

export const getMealsList = (onSuccess, onError) => {
  return useQuery("mealsKey", fecthMeals, {
    onSuccess,
    onError,
  });
};

export default getMealsList;
