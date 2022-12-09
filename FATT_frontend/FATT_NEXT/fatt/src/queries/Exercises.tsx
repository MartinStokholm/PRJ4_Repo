import { useQuery } from "react-query";
import { request } from "../utils/axios";
import type { Exercises } from "../../interfaces/Exercise";
import axios from "axios";

const fecthExercises = async () => {
  let exercises: Exercises = null;
  try {
    const response = await request({ url: `exercise`, method: "get" });
    exercises = response.data;
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Problem fetching data");
    } else {
      throw new Error("Problem fetching data");
    }
  }
};

const getExercisesList = (onSuccess, onError) => {
  return useQuery("exercisesKey", fecthExercises, {
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
};

export default getExercisesList;
