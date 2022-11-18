import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

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
      toast.success(`Delete workout `);
    },
    onError: () => {
      toast.error(`Error in deleting workout `);
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
    },
  });
};
