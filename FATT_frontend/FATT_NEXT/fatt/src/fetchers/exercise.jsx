import axios from "axios";
import { server } from "../../config/config"


  const fetchExercise = async (id)=> {
    console.log(`${server}exercise/${id}`)
    return await axios.get(`${server}exercise/${id}`)
  }

  export default fetchExercise;