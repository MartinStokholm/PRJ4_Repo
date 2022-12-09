import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";

import type { CalenderCreateNoIdDto } from "../../../interfaces/Calender";

export const postCalender = async (calandar: CalenderCreateNoIdDto) => {
  return request({ url: `calanar`, method: "post", data: calandar });
};

export const usePostCalender = () => {
  const queryClient = useQueryClient();
  return useMutation(postCalender, {
    onSuccess: (data) => {
      console.log("calender created");
    },
    onError: (_error, _workout, context) => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("calenderKey");
    },
  });
};
