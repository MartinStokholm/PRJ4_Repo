import { useQuery } from "react-query";
import { request } from "../utils/axios";
import type { Exercises } from "../../interfaces/Exercise";
import axios from "axios";

const fecthExercises = async () => {
  let exercises: Exercises = null;
  try {
    const response = await request({ url: `exercise`, method: "get" });
    //console.log(response.status);
    exercises = response.data;
    //assertIsExercise(exercises);
    //return exercises;
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //console.log(error);
      throw new Error("Problem fetching data");
    } else {
      //console.log("not Axios", error);
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
