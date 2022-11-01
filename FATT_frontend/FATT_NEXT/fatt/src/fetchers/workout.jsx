import axios from "axios";
import { server } from "../../config/server"

 const fecthWorkouts = () => {
    return axios.get(`${server}workout`)
  }

  export default fecthWorkouts;