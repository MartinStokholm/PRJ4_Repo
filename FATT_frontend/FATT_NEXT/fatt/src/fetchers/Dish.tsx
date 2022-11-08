import axios, { AxiosResponse } from "axios";
import { server } from "../../config/config";
import type { Dish } from "../../interfaces/Dish";

const fetchDish = async ({ queryKey }) => {
  const id = queryKey[1];
  return await axios.get<AxiosResponse<Dish>>(`${server}dish/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
};

export default fetchDish;
