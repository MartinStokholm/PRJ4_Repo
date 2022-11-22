import { useQuery } from "react-query";
import { request } from "../utils/axios";

const fecthWorkouts = async () => {
  const response = await request({ url: `workout`, method: "get" });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const exercise = await response.data;
  //assertIsExercise(exercise);

  return response;
};

export const getWorkoutsList = (onSuccess, onError) => {
  return useQuery("workoutsKey", fecthWorkouts, {
    refetchOnWindowFocus: true,
    onSuccess,
    onError,
  });
};

export default getWorkoutsList;
