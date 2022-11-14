import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";

import type { Exercise, ExerciseSimpleDto } from "../../../interfaces/Exercise";

export const postExercise = async (exercise: ExerciseSimpleDto) => {
  return request({ url: `exercise/list`, method: "post", data: exercise });
};

export const usePostExerciseSimpel = () => {
  const queryClient = useQueryClient();
  return useMutation(postExercise, {
    onMutate: async (newExercise) => {
      await queryClient.cancelQueries("exercisesKey");
      const previouesExerciseData: Exercise[] =
        queryClient.getQueryData("exercisesKey");
      queryClient.setQueryData("exercisesKey", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...(oldQueryData?.data?.length + 1), ...newExercise },
          ],
        };
      });
      return {
        previouesExerciseData,
      };
    },
    onError: (_error, _exercise, context) => {
      queryClient.setQueryData("exercisesKey", context.previouesExerciseData);
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("exercisesKey");
      queryClient.invalidateQueries("exerciseKey");
    },
  });
};
