import { useQuery } from "react-query";
import fecthWorkouts from "../fetchers/Workouts";

export const useWorkoutsData = (onSuccess, onError) => {
  return useQuery("workoutsKey", fecthWorkouts, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
  });
};
