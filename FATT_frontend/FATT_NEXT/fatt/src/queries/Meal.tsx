import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios";

const FetchMeal = async ({ queryKey }) => {
  const id = queryKey[1];
  const response = await request({ url: `meal/${id}`, method: "get" });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const dish = await response.data;
  //assertIsExercise(exercise);

  return response;
};

export const GetMeal = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery([`mealKey`, id], FetchMeal, {
    /*
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
    */
  });
};

export default GetMeal;
