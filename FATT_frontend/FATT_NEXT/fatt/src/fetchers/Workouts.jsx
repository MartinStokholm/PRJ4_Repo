import axios from "axios";
import { server } from "../../config/config";

const fecthWorkouts = async () => {
  return await axios.get(`${server}workout`);
};

export default fecthWorkouts;
