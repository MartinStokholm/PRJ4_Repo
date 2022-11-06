import axios from "axios";
import { server } from "../../config/config";

const fetchDish = async ({ queryKey }) => {
  const id = queryKey[1];
  return await axios.get(`${server}dish/${id}`);
};

export default fetchDish;
