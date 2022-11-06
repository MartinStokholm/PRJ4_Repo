import axios from "axios";
import { server } from "../../config/config";

const fecthMeals = async () => {
  return await axios.get(`${server}meal`);
};

export default fecthMeals;
