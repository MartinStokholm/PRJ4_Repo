import axios from "axios";
import { server } from "../../config/config";

const fecthDishs = async () => {
  return await axios.get(`${server}dish`);
};

export default fecthDishs;
