import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../utils/axios";

export const updateWorkout = async (workoutId: number, exerciseId) => {
  return request({
    url: `workout/${workoutId}/RemoveExercise/${exerciseId}`,
    method: "put",
    data: workoutId,
    workoutId,
  });
};

export const useUpdateWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWorkout, {
    onSuccess: (data) => {
      alert("Update");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
    },
  });
};

import type { WorkoutCreateNoIdDto } from "../../interfaces/Workout";
