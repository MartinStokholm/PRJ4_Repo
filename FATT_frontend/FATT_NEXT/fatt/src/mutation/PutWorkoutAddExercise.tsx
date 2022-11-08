import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../utils/axios";

import type { Workout } from "../../interfaces/Workout";

export const updateWorkout = async (workoutId: number, exerciseId) => {
  return request({
    url: `workout/${workoutId}/AddExercise/${exerciseId}`,
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
      queryClient.setQueryData("workoutsKey", context.previouesWorkoutData);
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
    },
  });
};

import type { WorkoutCreateNoIdDto } from "../../interfaces/Workout";

export const addWorkout = async (workout: WorkoutCreateNoIdDto) => {
  return request({ url: `workout`, method: "post", data: workout });
};
