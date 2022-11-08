import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../utils/axios";

export const updateWorkoutRemoveExercise = async (workout) => {
  return request({
    url: `workout/${workout.workoutId}/RemoveExercise/${workout.exerciseId}`,
    method: "put",
    data: workout,
  });
};

export const useUpdateWorkoutRemoveExercise = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWorkoutRemoveExercise, {
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
