import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import { middleware } from "../../components/Redirect";
import { NextRequest } from "next/server";
import { useRouter } from "next/router";

import type { AccountNoIdDto } from "../../../interfaces/Account";
import { NextResponse } from "next/server";
import { server } from "../../../config/config";

export const addAccount = async (account: AccountNoIdDto) => {
  return request({ url: `account`, method: "post", data: account });
};

export const usePostRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(postRegister, {
    onSuccess: (newAccount) => {
      toast.success(`Account Created "${newAccount.data.name}"`);
      router.push("/login");
      // () => middleware();
    },
    onError: (_error, _account, context) => {
      toast.error("Creating Account Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("accountsKey");
    },
  });
};

// fetch("http://localhost:4000/Register", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(post),
// }).then(() => {
//   // console.log("post added");
//   // props.history.push("/");
//   window.location = "/login";
// });
// };

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
