import axios from "axios";
import { server } from "../../config/server"

 const fecthExercises = () => {
    console.log(`${server}exercise`)
    return axios.get(`${server}exercise`)
  }

  export default fecthExercises;