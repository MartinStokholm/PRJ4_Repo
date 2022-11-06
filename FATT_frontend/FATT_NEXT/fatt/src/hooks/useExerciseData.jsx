import { useQuery, useQueryClient } from "react-query";
import fecthExercise from "../fetchers/exercise";

export const useExerciseData = (id, onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useQuery([`exerciseKey`, id], fecthExercise, {
    initialData: () => {
      const exercise = queryClient
        .getQueriesData("exercisesKey")
        ?.data?.find((exercise) => exercise.id === parseInt(id));

      if (exercise) {
        return { data: exercise };
      } else {
        return undefined;
      }
    },
    onSuccess,
    onError,
  });
};
