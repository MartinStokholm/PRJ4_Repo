import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import type { AccountChangePasswordDto } from "../../../interfaces/Account";

export const updatePassword = async (account: AccountChangePasswordDto) => {
  return request({
    url: `account/changepassword`,
    method: "put",
    data: account,
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePassword, {
    onSuccess: (data) => {
      toast.success(`Updated Password`);
    },
    onError: () => {
      toast.error("Updating Password Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("accountKey");
    },
  });
};
