import { useQuery } from "react-query";
import fecthExercises from "../fetchers/Exercises";

export const useExercisesData = (onSuccess, onError) => {
  return useQuery("exercisesKey", fecthExercises, {
    onSuccess,
    onError,
  });
};
