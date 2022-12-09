import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const deleteWorkout = async (workout) => {
  return request({
    url: `workout/${workout}`,
    method: "delete",
  });
};

export const useDeleteWorkout = () => {
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
