import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

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
    onSuccess: (data) => {
      toast.success(`Deleted Dish "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Deleting Dish Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("dishsKey");
    },
  });
};
