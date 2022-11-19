import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { MealNoIdDto, Meal } from "../../../interfaces/Meal";

export const updatemeal = async (meal: Meal) => {
  let mealNoIdDto: MealNoIdDto = null;
  mealNoIdDto = meal;
  return request({
    url: `meal/${meal.Id}`,
    method: "put",
    data: mealNoIdDto,
  });
};

export const useUpdatemeal = () => {
  const queryClient = useQueryClient();
  return useMutation(updatemeal, {
    onSuccess: (data, context) => {
      toast.success(`Updated Meal "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Updating Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
    },
  });
};
