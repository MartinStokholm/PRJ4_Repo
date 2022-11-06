import axios from "axios";
import { server } from "../../config/config"

const fecthMeals = () => {
  return axios.get(`${server}meal`)
}

export default fecthMeals;