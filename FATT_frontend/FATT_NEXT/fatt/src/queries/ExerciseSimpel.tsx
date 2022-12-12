import { useQuery } from "react-query";
import { request } from "../utils/axios";
import type { Exercises } from "../../interfaces/Exercise";
import axios from "axios";

const FecthExercisesSimpel = async () => {
  let exercises: Exercises = null;
  try {
    const response = await request({ url: `exercise/simpel`, method: "get" });
    //console.log(response.status);
    exercises = response.data;
    //assertIsExercise(exercises);
    //return exercises;
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw new Error("Problem fetching data");
      //handleAxiosError(error);
    } else {
      console.log("not Axios", error);
      throw new Error("Problem fetching data");
      //handleUnexpectedError(error);
    }
  }
};

export const GetExercisesListSimpel = (onSuccess, onError) => {
  return useQuery("exercisesKey", FecthExercisesSimpel, {
    onSuccess,
    onError,
  });
};
