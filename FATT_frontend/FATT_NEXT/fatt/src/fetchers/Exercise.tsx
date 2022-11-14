import axios, { AxiosResponse } from "axios";
import { server } from "../../config/config";
import type { Exercise } from "../../interfaces/Exercise";
import { assertIsExercise } from "../assert/assertIsExercise";

const fetchExercise = async ({ queryKey }) => {
  const id = queryKey[1];
  console.log(`${server}exercise/${id}`);
  const response = await axios.get<AxiosResponse<Exercise>>(
    `${server}exercise/${id}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const exercise = await response.data;
  assertIsExercise(exercise);

  return response;
};

export default fetchExercise;

//<AxiosResponse<WorkOut>>
