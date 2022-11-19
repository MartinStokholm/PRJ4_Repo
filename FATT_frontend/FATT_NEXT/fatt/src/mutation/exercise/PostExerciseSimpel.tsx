import { QueryKey, useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { Exercise, ExerciseSimpleDto } from "../../../interfaces/Exercise";

export const postExercise = async (exercise: ExerciseSimpleDto) => {
  return request({ url: `exercise/list`, method: "post", data: exercise });
};

export const usePostExerciseSimpel = () => {
  const queryClient = useQueryClient();
  return useMutation(postExercise, {
    onMutate: async (newExercise) => {
      toast.success(`Added List Of Exercise `);
      await queryClient.cancelQueries("exercisesKey");
      const previouesExerciseData: Exercise[] =
        queryClient.getQueryData("exercisesKey");
      queryClient.setQueryData<Exercise[]>("exercisesKey", (oldQueryData) => {
        return [...oldQueryData, newExercise as Exercise];
      });
      return {
        previouesExerciseData,
      };
    },
    onError: (_error, _exercise, context) => {
      queryClient.setQueryData("exercisesKey", context.previouesExerciseData);
      toast.error("Failed In Adding List Of Exercise");
    },
    onSettled: () => {
      queryClient.invalidateQueries("exercisesKey");
      queryClient.invalidateQueries("exerciseKey");
    },
  });
};
