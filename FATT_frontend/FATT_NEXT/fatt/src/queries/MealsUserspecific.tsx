import { useQuery } from "react-query";
import { request } from "../utils/axios";

const fecthMeals = async () => {
  const response = await request({
    url: `meal/account/${localStorage.getItem("email")}`,
    method: "get",
  });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const dish = await response.data;
  //assertIsExercise(exercise);

  return response;
};

export const getMealsList = (onSuccess, onError) => {
  return useQuery("mealsKey", fecthMeals, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
};

export default getMealsList;
