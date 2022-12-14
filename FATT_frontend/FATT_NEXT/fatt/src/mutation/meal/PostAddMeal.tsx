import { useMutation, useQueryClient } from "react-query";
import { server } from "../../../config/config";
import type { Meal } from "../../../interfaces/Meal";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

const addMeal = (meal: Meal) => {
  return request({ url: `meal`, methode: "post", data: meal });
};

export const PostAddMealData = () => {
  const queryClient = useQueryClient();
  return useMutation(addMeal, {
    onSuccess: (data) => {
      toast.success(`Created Meal "${data.data.name}"`);
    },
    onError: (_) => {
      toast.error("Creating Meal Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealKey");
    },
  });
};
