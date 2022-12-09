import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { WorkoutCreateNoIdDto } from "../../../interfaces/Workout";

export const addWorkout = async (workout: WorkoutCreateNoIdDto) => {
  return request({
    url: `workout/${localStorage.getItem("email")}`,
    method: "post",
    data: workout,
  });
};

export const useAddWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation(addWorkout, {
    onMutate: async (newWorkout) => {
      await queryClient.cancelQueries("workoutsKey");
      const previouesWorkoutData = queryClient.getQueryData("workoutsKey");
      queryClient.setQueryData("workoutsKey", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...(oldQueryData?.data?.length + 1), ...newWorkout },
          ],
        };
      });
      return {
        previouesWorkoutData,
      };
    },
    onSuccess: (newAccount) => {
      toast.success(`Account Created "${newAccount.data.name}"`);
    },
    onError: (_error, _workout, context) => {
      queryClient.setQueryData("workoutsKey", context.previouesWorkoutData);
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
    },
  });
};
