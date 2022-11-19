import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { CalenderCreateNoIdDto } from "../../../interfaces/Calender";

// There is missing a id and a foreign key between calandar and account
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
