import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { Workout } from "../../../interfaces/Workout";

export const updateWorkout = async (workout: Workout) => {
  return request({
    url: `workout/${workout.id}`,
    method: "put",
    data: workout,
  });
};

export const useUpdateWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWorkout, {
    onSuccess: (data, context) => {
      toast.success(`Updated Exercise "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
      queryClient.invalidateQueries("workoutKey");
    },
  });
};
