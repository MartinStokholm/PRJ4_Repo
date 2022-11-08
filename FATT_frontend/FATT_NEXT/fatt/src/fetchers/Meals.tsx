import axios, { AxiosResponse } from "axios";
import { server } from "../../config/config";
import type { Meals } from "../../interfaces/Meal";

const fecthMeals = async () => {
  return await axios.get<AxiosResponse<Meals>>(`${server}meal`);
};

export default fecthMeals;
