import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { MealAddToCalendar } from "../../../interfaces/Meal";

export const updateMealToCalendar = async (meal: MealAddToCalendar) => {
  console.log("id");
  return request({
    url: `meal/${meal.mealId}/AddToCalender/${meal.day}/Account/${meal.email}`,
    method: "put",
    data: meal,
  });
};

export const useUpdateMealToCalendar = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMealToCalendar, {
    onSuccess: (data) => {
      console.log(data.data);
      toast.success(`Added Meal To Calendar`);
    },
    onError: () => {
      toast.error("Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
      queryClient.invalidateQueries("mealKey");
    },
  });
};
