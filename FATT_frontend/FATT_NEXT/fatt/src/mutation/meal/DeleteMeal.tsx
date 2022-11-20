import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { Meal } from "../../../interfaces/Meal";

export const deleteMeal = async (meal: Meal) => {
  return request({
    url: `meal/${meal.Id}`,
    method: "delete",
  });
};

export const useDeleteMeal = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMeal, {
    onSuccess: (data) => {
      toast.success(`Deleted Meal "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Deleting Meal Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
    },
  });
};
