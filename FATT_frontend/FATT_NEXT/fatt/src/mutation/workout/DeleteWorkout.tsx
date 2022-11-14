import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";

import type { Workout } from "../../../interfaces/Workout";

export const deleteWorkout = async (workout: Workout) => {
  return request({
    url: `workout/${workout.id}`,
    method: "delete",
  });
};

export const useDeleteWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteWorkout, {
    onSuccess: () => {
      alert("Deleted");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
    },
  });
};
