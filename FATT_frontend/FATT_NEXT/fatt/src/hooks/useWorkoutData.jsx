import { useQuery, useQueryClient } from "react-query";
import fetchWorkout from "../fetchers/Workout";

export const useWorkoutData = (id, onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useQuery([`workoutKey`, id], fecthworkout, {
    initialData: () => {
      const workout = queryClient
        .getQueriesData("workoutsKey")
        ?.data?.find((workout) => workout.id === parseInt(id));

      if (workout) {
        return { data: workout };
      } else {
        return undefined;
      }
    },
    onSuccess,
    onError,
  });
};
