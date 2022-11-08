import axios, { AxiosResponse } from "axios";
import { server } from "../../config/config";
import type { Workout } from "../../interfaces/Workout";

const fetchWorkout = async ({ queryKey }) => {
  const id = queryKey[1];
  return await axios.get<AxiosResponse<Workout>>(`${server}workout/${id}`);
};

export default fetchWorkout;
//<AxiosResponse<WorkOut>>
