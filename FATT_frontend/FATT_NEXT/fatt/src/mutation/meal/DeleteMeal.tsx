import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";

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
    onSuccess: () => {
      alert("Deleted");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
    },
  });
};
