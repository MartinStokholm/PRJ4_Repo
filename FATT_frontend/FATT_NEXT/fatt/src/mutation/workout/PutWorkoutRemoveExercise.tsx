import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const updateWorkoutRemoveExercise = async (workout) => {
  console.log(workout);
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
      toast.success(`Removed Exercise from "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Failed to remove exercise");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
      queryClient.invalidateQueries("workoutKey");
    },
  });
};
