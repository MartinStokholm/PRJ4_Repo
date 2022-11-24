import type { Workout } from "../../interfaces/Workout";
import { useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios";

const fetchWorkout = async ({ queryKey }) => {
  console.log(`Fetch from ${queryKey[1]}`);
  const id = queryKey[1];
  const response = await request({
    url: `workout/${id}/${localStorage.getItem("email")}`,
    method: "get",
  });
  console.log(`Response code: ${response.status}`);
  if (response.status == 304) {
    throw new Error("Problem fetching data");
  }
  const exercise = await response.data;
  //assertIsExercise(exercise);

  return response;
};

export const getWorkout = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery([`workoutKey`, id], fetchWorkout, {
    initialData: () => {
      const workout = queryClient
        .getQueriesData("workoutsKey")
        ?.data?.find((workout) => workout.id === parseInt(id));

      if (workout) {
        return { data: workout };
      } else {
        return undefined;
      }
    },
    refetchOnWindowFocus: false,
  });
};
