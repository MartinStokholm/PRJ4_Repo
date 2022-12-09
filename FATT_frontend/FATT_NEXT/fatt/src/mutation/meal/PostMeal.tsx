import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { MealCreateNoIdDto } from "../../../interfaces/Meal";

export const addMeal = async (meal: MealCreateNoIdDto) => {
  return request({
    url: `meal/${localStorage.getItem("email")}`,
    method: "post",
    data: meal,
  });
};

export const useAddMeal = () => {
  const queryClient = useQueryClient();
  return useMutation(addMeal, {
    onMutate: async (newMeal) => {
      await queryClient.cancelQueries("mealsKey");
      const previouesMealData = queryClient.getQueryData("mealsKey");
      queryClient.setQueryData("mealsKey", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...(oldQueryData?.data?.length + 1), ...newMeal },
          ],
        };
      });
      return {
        previouesMealData,
      };
    },
    onSuccess: (newMeal) => {
      toast.success(`Meal Created "${newMeal.data.name}"`);
    },
    onError: (_error, _meal, context) => {
      queryClient.setQueryData("mealsKey", context.previouesMealData);
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
    },
  });
};
