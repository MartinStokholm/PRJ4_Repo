import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { Exercise } from "../../../interfaces/Exercise";

export const deleteExercise = async (id: number) => {
  return request({
    url: `exercise/${id}`,
    method: "delete",
  });
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteExercise, {
    onSuccess: (data) => {
      toast.success(`Deleted Exercise "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Deleting Exercise Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("exercisesKey");
    },
  });
};
