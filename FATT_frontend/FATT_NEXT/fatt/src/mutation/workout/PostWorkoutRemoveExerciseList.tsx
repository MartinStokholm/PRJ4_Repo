import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const removeExercisesToWorkout = async (data) => {
  console.log(data.workoutId, data.exerciseIds);
  return request({
    url: `${data.workoutId}/RemoveExercise/list`,
    method: "post",
    data: data.exerciseIds,
  });
};

export const useRemoveExercisesToWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(removeExercisesToWorkout, {
    onMutate: async (newExerciseList: any) => {
      toast(`Remove Exercise List From Workout`);

      await queryClient.cancelQueries("workoutsKey");

      const previouesWorkoutData = queryClient.getQueryData("workoutsKey");

      queryClient.setQueryData("workoutsKey", (oldQueryData: any) => {
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
