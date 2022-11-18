import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";

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
    onSuccess: (data) => {
      alert("Update");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
    },
  });
};
