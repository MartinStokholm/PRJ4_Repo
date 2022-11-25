import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import type { AccountChangeEmailDto } from "../../../interfaces/Account";

export const updateAge = async (age: number) => {
  return request({
    url: `account/${localStorage.getItem("email")}/age/${age}`,
    method: "put",
    data: age,
  });
};

export const useUpdateAge = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAge, {
    onSuccess: (data) => {
      toast.success(`Updated Age`);
    },
    onError: () => {
      toast.error("Updating Age Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("accountKey");
    },
  });
};
