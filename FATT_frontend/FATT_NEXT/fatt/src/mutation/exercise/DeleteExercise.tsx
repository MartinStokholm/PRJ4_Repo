import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";

import type { Exercise } from "../../../interfaces/Exercise";

export const deleteExercise = async (exercise: Exercise) => {
  return request({
    url: `exercise/${exercise.Id}`,
    method: "delete",
  });
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteExercise, {
    onSuccess: () => {
      alert("Deleted");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("exercisesKey");
    },
  });
};
