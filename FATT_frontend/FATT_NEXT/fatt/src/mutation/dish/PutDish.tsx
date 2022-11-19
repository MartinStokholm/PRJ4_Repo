import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { DishNoIdDto, Dish } from "../../../interfaces/Dish";

export const updateDish = async (dish: Dish) => {
  let dishNoIdDto: DishNoIdDto = null;
  dishNoIdDto = dish;
  return request({
    url: `workout/${dish.Id}`,
    method: "put",
    data: dishNoIdDto,
  });
};

export const useUpdateDish = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDish, {
    onSuccess: (data) => {
      toast.success(`Updated Dish "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Failed In Updating Dish");
    },
    onSettled: () => {
      queryClient.invalidateQueries("dishsKey");
    },
  });
};
