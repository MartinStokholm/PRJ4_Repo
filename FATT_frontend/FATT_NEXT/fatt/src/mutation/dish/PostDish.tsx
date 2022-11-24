import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { DishNoIdDto } from "../../../interfaces/Dish";

export const postDish = async (dish: DishNoIdDto) => {
  return request({ url: `dish`, method: "post", data: dish });
};

export const usePostDish = () => {
  const queryClient = useQueryClient();
  return useMutation(postDish, {
    onMutate: async (newDish) => {
      toast.success(`Created Dish "${newDish.name}"`);
      await queryClient.cancelQueries("dishsKey");
      const previouesDishData = queryClient.getQueryData("dishsKey");
      queryClient.setQueryData("dishsKey", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...(oldQueryData?.data?.length + 1), ...newDish },
          ],
        };
      });
      return {
        previouesDishData,
      };
    },
    onError: (_error, _dish, context) => {
      queryClient.setQueryData("dishsKey", context.previouesDishData);
      toast.error("Failed In Creating Dish");
    },
    onSettled: () => {
      queryClient.invalidateQueries("dishsKey");
    },
  });
};
