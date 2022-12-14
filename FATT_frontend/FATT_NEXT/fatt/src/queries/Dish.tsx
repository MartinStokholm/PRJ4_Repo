import { request } from "../utils/axios";
import type { Dish } from "../../interfaces/Dish";
import { useQuery, useQueryClient } from "react-query";

const FetchDish = async ({ queryKey }) => {
  const id = queryKey[1];
  return request({ url: `dish/${id}`, method: "get" });
};

export const GetDish = (id: any, onSuccess, onError) => {
  const queryClient = useQueryClient();

  return useQuery([`dishKey`, id], FetchDish, {
    /*
    initialData: () => {
      const dish = queryClient
        .getQueriesData("dishsKey")
        ?.data?.find((dish) => dish.id === parseInt(id));

      if (dish) {
        return { data: dish };
      } else {
        return undefined;
      }
    },
    */
    onSuccess,
    onError,
  });
};

export default GetDish;
