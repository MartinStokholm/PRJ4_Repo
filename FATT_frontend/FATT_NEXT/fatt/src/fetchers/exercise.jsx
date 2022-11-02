import axios from "axios";
import { server } from "../../config/server"

 const  fecthExercises = async () => {
    console.log(`${server}exercise`)
    return await axios.get(`${server}exercise`)
  }

  export default fecthExercises;