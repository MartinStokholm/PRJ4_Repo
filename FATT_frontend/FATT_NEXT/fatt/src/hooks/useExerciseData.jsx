
import { useQuery } from "react-query";
import fecthExercise from "../fetchers/exercise";

export const useExerciseData = (heroId, onSuccess, onError) => {
    return useQuery(
      [`exerciseKey`, heroId], 
      () => fecthExercise(heroId), 
      { 
        refetchOnWindowFocus: true, 
        onSuccess,
        onError,
      }
    );
}
