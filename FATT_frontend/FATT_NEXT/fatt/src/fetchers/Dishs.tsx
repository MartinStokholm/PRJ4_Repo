import axios, { AxiosResponse } from "axios";
import type { Dishs } from "../../interfaces/Dish";
import { server } from "../../config/config";

const fecthDishs = () => {
  return axios.get<AxiosResponse<Dishs>>(`${server}dish`);
};

export default fecthDishs;
