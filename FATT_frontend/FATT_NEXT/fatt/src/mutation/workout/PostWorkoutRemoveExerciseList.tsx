import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { ExerciseIds } from "../../../interfaces/Exercise";

export const removeExercisesToWorkout = async (
  workoutId: number,
  exerciseIds: ExerciseIds
) => {
  return request({
    url: `${workoutId}/RemoveExercise/list`,
    method: "post",
    data: exerciseIds,
  });
};

export const useRemoveExercisesToWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(removeExercisesToWorkout, {
    onMutate: async (newExerciseList) => {
      toast(`Remove Exercise List From Workout`);
      await queryClient.cancelQueries("workoutsKey");
      const previouesWorkoutData = queryClient.getQueryData("workoutsKey");
      queryClient.setQueryData("workoutsKey", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...(oldQueryData?.data?.length + 1), ...newExerciseList },
          ],
        };
      });
      return {
        previouesWorkoutData,
      };
    },
    onError: (_error, _workout, context) => {
      queryClient.setQueryData("workoutsKey", context.previouesWorkoutData);
      toast.error("Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
      queryClient.invalidateQueries("workoutKey");
    },
  });
};
