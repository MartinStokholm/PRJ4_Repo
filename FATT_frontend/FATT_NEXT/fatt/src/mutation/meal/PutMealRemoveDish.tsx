import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const updateMealRemoveDish = async (meal) => {
  console.log(meal);
  return request({
    url: `meal/${meal.mealId}/RemoveDish/${meal.dishId}`,
    method: "put",
    data: meal,
  });
};

export const useUpdateMealRemoveDish = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMealRemoveDish, {
    onSuccess: (data) => {
      toast.success(`Removed Dish from "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Failed to remove dish");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
      queryClient.invalidateQueries("mealKey");
    },
  });
};
