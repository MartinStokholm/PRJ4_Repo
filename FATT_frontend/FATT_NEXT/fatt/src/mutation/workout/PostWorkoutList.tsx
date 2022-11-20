import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { WorkoutCreateNoIdDto } from "../../../interfaces/Workout";

export const addWorkoutList = async (workout: WorkoutCreateNoIdDto[]) => {
  return request({ url: `workout/list`, method: "post", data: workout });
};

export const useAddWorkoutListData = () => {
  const queryClient = useQueryClient();
  return useMutation(addWorkoutList, {
    onSuccess: (newWorkout) => {
      toast.success(`Add List of workout`);
      queryClient.setQueryData("workoutsKey", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, newWorkout.data],
        };
      });
    },
    onError: () => {
      alert("there was an error");
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries("workoutsKey");
    // },
  });
};
