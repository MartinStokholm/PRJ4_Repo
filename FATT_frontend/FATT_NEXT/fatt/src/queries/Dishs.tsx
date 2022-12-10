import axios, { AxiosResponse } from "axios";
import type { Dishs } from "../../interfaces/Dish";
import { useQuery } from "react-query";
import { request } from "../utils/axios";

const FecthDishs = () => {
  return request({ url: `dish`, method: "get" });
};

export const GetDishsList = (onSuccess, onError) => {
  return useQuery("dishsKey", FecthDishs, {
    onSuccess,
    onError,
  });
};

export default GetDishsList;
