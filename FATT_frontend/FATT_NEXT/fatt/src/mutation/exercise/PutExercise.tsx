import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { server } from "../../../config/config";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { ExerciseNoIdDto, Exercise } from "../../../interfaces/Exercise";

export const updateExercise = async (exercise: Exercise) => {
  let exerciseNoIdDto: ExerciseNoIdDto = null;
  exerciseNoIdDto = exercise;
  return request({
    url: `exercise/${exercise.Id}`,
    method: "put",
    data: exerciseNoIdDto,
  });
};

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation(updateExercise, {
    onSuccess: (data) => {
      toast.success(`Update Exercise "${data.data.name}"`);
    },
    onError: () => {
      toast.error("Updating Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("exercisesKey");
    },
  });
};
