import axios from "axios";
import { server } from "../../config/config"

const fecthWorkouts = () => {
    return axios.get(`${server}workout`)
}

export default fecthWorkouts;