import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";

import type { Dish } from "../../../interfaces/Dish";

export const deleteDish = async (dish: Dish) => {
  return request({
    url: `dish/${dish.Id}`,
    method: "delete",
  });
};

export const useDeleteDish = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDish, {
    onSuccess: () => {
      alert("Deleted");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("dishsKey");
    },
  });
};
