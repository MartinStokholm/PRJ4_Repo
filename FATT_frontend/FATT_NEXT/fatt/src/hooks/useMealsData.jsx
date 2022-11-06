import { useQuery } from "react-query";
import fecthmeals from "../fetchers/meals";

export const useMealsData = (onSuccess, onError) => {
  return useQuery("mealsKey", fecthmeals, {
    onSuccess,
    onError,
  });
};
