import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { WorkoutAddToCalendar } from "../../../interfaces/Workout";

export const updateWorkoutToCalendar = async (
  workout: WorkoutAddToCalendar
) => {
  console.log("id");
  return request({
    url: `workout/${workout.workoutId}/AddToCalender/${workout.day}/Account/${workout.email}`,
    method: "put",
    data: workout,
  });
};

export const useUpdateWorkoutToCalendar = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWorkoutToCalendar, {
    onSuccess: (data) => {
      console.log(data.data);
      toast.success(`Added Workout To Calendar`);
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
