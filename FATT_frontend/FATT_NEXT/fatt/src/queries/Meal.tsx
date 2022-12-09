import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios";

const fetchMeal = async ({ queryKey }) => {
  const id = queryKey[1];
  const response = await request({ url: `meal/${id}`, method: "get" });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }

  return response;
};

export const getMeal = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery([`mealKey`, id], fetchMeal, {
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
  });
};

export default getMeal;
