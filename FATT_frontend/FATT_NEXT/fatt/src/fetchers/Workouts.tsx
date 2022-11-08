import axios, { AxiosResponse } from "axios";
import { server } from "../../config/config";
import type * as Workout from "../../interfaces/Workout";

const fecthWorkouts = async () => {
  return await axios.get<AxiosResponse<Workout.Workouts>>(`${server}workout`);
};

export default fecthWorkouts;
