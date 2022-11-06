import { useQuery, useQueryClient } from "react-query";
import fecthmeal from "../fetchers/meal";

export const useMealData = (id, onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useQuery([`mealKey`, id], fecthmeal, {
    initialData: () => {
      const meal = queryClient
        .getQueriesData("mealsKey")
        ?.data?.find((meal) => meal.id === parseInt(id));

      if (meal) {
        return { data: meal };
      } else {
        return undefined;
      }
    },
    onSuccess,
    onError,
  });
};
