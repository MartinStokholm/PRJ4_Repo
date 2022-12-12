import { useQuery } from "react-query";
import { request } from "../utils/axios";

const FecthWorkouts = async () => {
  const response = await request({ url: `workout`, method: "get" });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const exercise = await response.data;

  return response;
};

export const GetWorkoutsList = (onSuccess, onError) => {
  return useQuery("workoutsKey", FecthWorkouts, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
};

export default GetWorkoutsList;
