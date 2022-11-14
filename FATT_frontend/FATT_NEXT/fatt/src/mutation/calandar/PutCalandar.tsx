import { useMutation, useQueryClient } from "react-query";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";

import type { CalandarCreateNoIdDto } from "../../../interfaces/Calandar";

export const updateWorkout = async (calandar: CalandarCreateNoIdDto) => {
  return request({
    url: `calandar/${calandar.calandarId}`,
    method: "put",
    data: calandar,
  });
};

export const useUpdateWorkoutData = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWorkout, {
    onSuccess: (data) => {
      alert("Update");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
    },
  });
};
