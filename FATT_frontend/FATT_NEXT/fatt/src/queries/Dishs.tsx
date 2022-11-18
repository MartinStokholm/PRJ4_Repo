import axios, { AxiosResponse } from "axios";
import type { Dishs } from "../../interfaces/Dish";
import { useQuery } from "react-query";
import { request } from "../utils/axios";

const fecthDishs = () => {
  return request({ url: `dish`, method: "get" });
};

export const getDishsList = (onSuccess, onError) => {
  return useQuery("dishsKey", fecthDishs, {
    onSuccess,
    onError,
  });
};

export default getDishsList;
