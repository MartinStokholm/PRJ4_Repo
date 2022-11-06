import axios from "axios";
import { server } from "../../config/config";

const fetchMeal = async ({ queryKey }) => {
  const id = queryKey[1];
  return await axios.get(`${server}meal/${id}`);
};

export default fetchMeal;
