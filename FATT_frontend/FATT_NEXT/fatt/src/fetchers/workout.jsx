import axios from "axios";
import { server } from "../../config/config";

const fetchWorkout = async ({ queryKey }) => {
  const id = queryKey[1];
  return await axios.get(`${server}workout/${id}`);
};

export default fetchWorkout;
