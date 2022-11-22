import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { Exercise, ExerciseNoIdDto } from "../../../interfaces/Exercise";

export const postExercise = async (exercise: ExerciseNoIdDto) => {
  return request({ url: `exercise`, method: "post", data: exercise });
};

export const usePostExercise = () => {
  const queryClient = useQueryClient();
  return useMutation(postExercise, {
    onMutate: async (newExercise) => {
      toast.success(`Created Exercise "${newExercise.Name}"`);
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
      toast.error("Failed In Creating Exercise");
    },
    onSettled: () => {
      queryClient.invalidateQueries("exercisesKey");
      queryClient.invalidateQueries("exerciseKey");
    },
  });
};
