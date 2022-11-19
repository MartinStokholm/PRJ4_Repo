import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosResponse } from "axios";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

import type { CalandarCreateNoIdDto } from "../../../interfaces/Calender";

// There is missing a id and a foreign key between calandar and account
export const postCalandar = async (calandar: CalandarCreateNoIdDto) => {
  return request({ url: `calanar`, method: "post", data: calandar });
};

export const usePostCalandar = () => {
  const queryClient = useQueryClient();
  return useMutation(postCalandar, {
    onSuccess: (data) => {
      console.log("calandar created");
    },
    onError: (_error, _workout, context) => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("calandarKey");
    },
  });
};
