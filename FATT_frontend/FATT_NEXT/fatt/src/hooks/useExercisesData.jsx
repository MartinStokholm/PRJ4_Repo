import { useQuery } from "react-query";
import fecthExercises from "../fetchers/exercises";

export const useExercisesData = (onSuccess, onError) => {
  return useQuery("exercisesKey", fecthExercises, {
    onSuccess,
    onError,
  });
};
