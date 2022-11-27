import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { MealCreateNoIdDto } from "../../../interfaces/Meal";

export const addMeal = async (meal: MealCreateNoIdDto) => {
  return request({
    url: `meal/${localStorage.getItem("email")}`,
    method: "post",
    data: meal,
  });
};

export const useAddMeal = () => {
  const queryClient = useQueryClient();
  return useMutation(addMeal, {
    onMutate: async (newMeal) => {
      await queryClient.cancelQueries("mealsKey");
      const previouesMealData = queryClient.getQueryData("mealsKey");
      queryClient.setQueryData("mealsKey", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...(oldQueryData?.data?.length + 1), ...newMeal },
          ],
        };
      });
      return {
        previouesMealData,
      };
    },
    onSuccess: (newMeal) => {
      toast.success(`Meal Created "${newMeal.data.name}"`);
    },
    onError: (_error, _meal, context) => {
      queryClient.setQueryData("mealsKey", context.previouesMealData);
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("mealsKey");
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
