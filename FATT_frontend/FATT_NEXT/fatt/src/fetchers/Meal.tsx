import axios, { AxiosResponse } from "axios";
import { server } from "../../config/config";
import type * as Meal from "../../interfaces/Meal";

const fetchMeal = async ({ queryKey }) => {
  const id = queryKey[1];
  return await axios.get<AxiosResponse<Meal.Meal>>(`${server}meal/${id}`);
};

export default fetchMeal;
