import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const updateWorkoutAddExercise = async (workout) => {
  console.log(workout);
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
      console.log(data.data);
      toast.success(`Add Exercise to "${data.data.name}"`);
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
