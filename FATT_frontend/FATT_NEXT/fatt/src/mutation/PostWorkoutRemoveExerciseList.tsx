import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../utils/axios";

import type { ExerciseIds } from "../../interfaces/Exercise";

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

export const useAddExercisesToWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(removeExercisesToWorkout, {
    onMutate: async (newExerciseList) => {
      await queryClient.cancelQueries("workoutsKey");
      const previouesWorkoutData = queryClient.getQueryData("workoutsKey");
      queryClient.setQueryData("workoutsKey", (oldQueryData) => {
        return {
          //Missing logic to don't find the old id in query - Bjarke implement that later
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
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
      queryClient.invalidateQueries("workoutKey");
    },
  });
};
