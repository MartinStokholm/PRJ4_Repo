import type { Exercise } from "../../interfaces/Exercise";
import { assertIsExercise } from "../assert/assertIsExercise";
import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios";

const fetchExercise = async ({ queryKey }) => {
  const id = queryKey[1];

  const response = await request({ url: `exercise/${id}`, method: "get" });
  console.log(response.status);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const exercise = await response.data;
  assertIsExercise(exercise);

  return response;
};

export const getExercise = (id, onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useQuery([`exerciseKey`, id], fetchExercise, {
    initialData: () => {
      const exercise = queryClient
        .getQueriesData("exercisesKey")
        ?.data?.find((exercise) => exercise.id === parseInt(id));

      if (exercise) {
        return { data: exercise };
      } else {
        return undefined;
      }
    },
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
};

export default getExercise;

//<AxiosResponse<WorkOut>>

// const response = await axios.get<AxiosResponse<Exercise>>(
//   `${server}exercise/${id}`,
//   {
//     headers: {
//       Accept: "application/json",
//     },
//   }
// );
// console.log(response.status);
// if (response.status == 304) {
//   throw new Error("Problem fetching data");
// }
// const exercise = await response.data;
// assertIsExercise(exercise);

// return response;
