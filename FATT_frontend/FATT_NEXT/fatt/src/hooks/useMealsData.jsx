import { useQuery } from "react-query";
import fecthmeals from "../fetchers/Meals.tsx";

export const useMealsData = (onSuccess, onError) => {
  return useQuery("mealsKey", fecthmeals, {
    onSuccess,
    onError,
  });
};
