import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios";

const FetchMeal = async ({ queryKey }) => {
  console.log(`Fetch from ${queryKey[1]}`);
  const id = queryKey[1];
  const response = await request({
    url: `meal/${id}/${localStorage.getItem("email")}`,
    method: "get",
  });
  console.log(`Response code: ${response.status}`);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const dish = await response.data;

  return response;
};

export const GetMeal = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery([`workoutKey`, id], FetchMeal, {
    /*
    initialData: () => {
      const meal = queryClient
        .getQueriesData("workoutsKey")
        ?.data?.find((meal) => meal.id === parseInt(id));

      if (meal) {
        return { data: meal };
      } else {
        return undefined;
      }
    },
    */
    refetchOnWindowFocus: false,
  });
};
