import { useMutation, useQueryClient } from "react-query";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { CalandarCreateNoIdDto } from "../../../interfaces/Calender";

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
      toast.success(`Update Calendar "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Updating Calendar Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("workoutsKey");
    },
  });
};
