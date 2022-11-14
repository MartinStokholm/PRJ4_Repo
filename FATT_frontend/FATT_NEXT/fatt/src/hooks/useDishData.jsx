import { useQuery, useQueryClient } from "react-query";
import fecthdish from "../fetchers/dish";

export const useDishData = (id, onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useQuery([`dishKey`, id], fecthdish, {
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
    onSuccess,
    onError,
  });
};
