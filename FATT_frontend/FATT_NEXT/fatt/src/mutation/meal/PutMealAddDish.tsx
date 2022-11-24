import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { Meal } from "../../../interfaces/Meal";

export const updateMealAddDish = async (meal) => {
  console.log(meal);
  return request({
    url: `meal/${meal.mealId}/AddDish/${meal.dishId}`,
    method: "put",
    data: meal,
  });
};

export const useUpdateMealAddDishData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMealAddDish, {
    onSuccess: (data) => {
      console.log(data.data);
      toast.success(`Add Dish to "${data.data.name}"`);
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

import type { WorkoutCreateNoIdDto } from "../../../interfaces/Workout";
