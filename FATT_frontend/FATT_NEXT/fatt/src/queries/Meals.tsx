import { useQuery } from "react-query";
import { request } from "../utils/axios";

const FecthMeals = async () => {
  const response = await request({ url: `meal/`, method: "get" });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const exercise = await response.data;

  return response;
};

export const GetMealsList = (onSuccess, onError) => {
  return useQuery("mealsKey", FecthMeals, {
    onSuccess,
    onError,
  });
};

export default GetMealsList;
