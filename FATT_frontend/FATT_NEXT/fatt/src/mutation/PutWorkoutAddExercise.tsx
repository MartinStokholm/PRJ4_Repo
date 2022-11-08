import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../utils/axios";

import type { Workout } from "../../interfaces/Workout";

export const updateWorkoutAddExercise = async (workout) => {
  return request({
    url: `workout/${workout.workoutId}/AddExercise/${workout.exerciseId}`,
    method: "put",
    data: workout,
  });
};

export const useUpdateWorkoutAddExerciseData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWorkoutAddExercise, {
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
