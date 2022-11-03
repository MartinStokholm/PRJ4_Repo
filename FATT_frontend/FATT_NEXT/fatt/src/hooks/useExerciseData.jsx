
import { useQuery } from "react-query";
import fecthExercise from "../fetchers/exercise";

export const useExerciseData = (id, onSuccess, onError) => {
    return useQuery(
      [`exerciseKey`, id], 
      () => fecthExercise(id), 
      { 
        refetchOnWindowFocus: true, 
        onSuccess,
        onError,
      }
    );
}
