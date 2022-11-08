import axios, { AxiosResponse } from "axios";
import { server } from "../../config/config";
import type { Exercises } from "../../interfaces/Exercise";

const fecthExercises = async () => {
  console.log(`${server}exercise`);
  return await axios.get<AxiosResponse<Exercises>>(`${server}exercise`);
};

export default fecthExercises;
