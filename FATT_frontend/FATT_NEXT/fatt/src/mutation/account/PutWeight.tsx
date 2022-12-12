import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import type { AccountChangeEmailDto } from "../../../interfaces/Account";

export const updateWeight = async (weight: number) => {
  return request({
    url: `account/${localStorage.getItem("email")}/weight/${weight}`,
    method: "put",
    data: weight,
  });
};

export const useUpdateWeight = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWeight, {
    onSuccess: (data) => {
      toast.success(`Updated Weight`);
    },
    onError: () => {
      toast.error("Updating Weight Failed");
    },
    onSettled: () => {
      //queryClient.invalidateQueries("accountKey");
    },
  });
};
