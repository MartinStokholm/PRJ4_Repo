import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";

import type { CalandarCreateNoIdDto } from "../../../interfaces/Workout";

export const addWorkout = async (calandar: CalandarCreateNoIdDto) => {
  return request({ url: `calanar`, method: "post", data: calandar });
};

export const useAddWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(addCalandar, {
    onSuccess: (data) => {
      console.log("calandar created");
    },
    onError: (_error, _workout, context) => {
      queryClient.setQueryData("calandarKey", context.previouesWorkoutData);
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("calandarKey");
    },
  });
};

// onSuccess we take the data as a parameter and then we use the
// queryClient we the memory of the old data. First we return a
// object with all the old data and then we change the data propety
// to contain both the new and the old and append the new data on
// It is easy to understand compare to the optimistic update that we uses
// rigth now and this methode only works if get is already called before add is clicked

// onSuccess: (data) => {
//   queryClient.setQueryData("workoutsKey", (oldQueryData) => {
//     return {
//       ...oldQueryData,
//       data: [...oldQueryData.data, data.data],
//     };
//   });

// onMutate: async (newWorkout) => {
//   await queryClient.cancelQueries("workoutsKey");
//   const previouesWorkoutData = queryClient.getQueryData("workoutsKey");
//   queryClient.setQueryData("workoutsKey", (oldQueryData) => {
//     return {
//       ...oldQueryData,
//       data: [
//         ...oldQueryData.data,
//         { ...(oldQueryData?.data?.length + 1), ...newWorkout },
//       ],
//     };
//   });
//   return {
//     previouesWorkoutData,
//   };
// },
// onError: (_error, _workout, context) => {
//   queryClient.setQueryData("workoutsKey", context.previouesWorkoutData);
//   alert("there was an error");
// },
// onSettled: () => {
//   queryClient.invalidateQueries("workoutsKey");
// },
// });
