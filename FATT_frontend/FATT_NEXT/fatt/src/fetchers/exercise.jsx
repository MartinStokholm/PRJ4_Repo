import axios from "axios";
import { server } from "../../config/config";

const fetchExercise = async ({ queryKey }) => {
  const id = queryKey[1];
  console.log(`${server}exercise/${id}`);
  return await axios.get(`${server}exercise/${id}`);
};

export default fetchExercise;
