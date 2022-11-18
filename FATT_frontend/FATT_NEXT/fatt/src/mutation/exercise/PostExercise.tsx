import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";

import type {
  Exercise,
  ExerciseCreateNoIdDto,
} from "../../../interfaces/Exercise";

export const postExercise = async (exercise: ExerciseCreateNoIdDto) => {
  return request({ url: `exercise`, method: "post", data: exercise });
};

export const usePostExercise = () => {
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
    onError: (_error, _workout, context) => {
      queryClient.setQueryData("exercisesKey", context.previouesExerciseData);
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("exercisesKey");
      queryClient.invalidateQueries("exerciseKey");
    },
  });
};
