import { useMutation, useQueryClient } from "react-query";
import { server } from "../../config/config";
import type { Meal } from "../../interfaces/Meal";
import { request } from "../utils/axios";

const addMeal = (meal: Meal) => {
  return request({ url: `meal`, methode: "post", data: meal });
};

export const useAddMealData = () => {
  const queryClient = useQueryClient();
  return useMutation(addMeal, {
    onSuccess: (data) => {
      console.log(data);
      const message = "sucess";
      alert(message);
    },
    onError: (_) => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealKey");
    },
  });
};
