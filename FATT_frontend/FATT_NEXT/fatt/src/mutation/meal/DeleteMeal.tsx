import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const deleteMeal = async (meal) => {
  return request({
    url: `meal/${meal}`,
    method: "delete",
  });
};

export const useDeleteMeal = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMeal, {
    onSuccess: (data) => {
      toast.success(`Deleted Meal `);
    },
    onError: () => {
      toast.error("Deleting Meal Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
    },
  });
};
