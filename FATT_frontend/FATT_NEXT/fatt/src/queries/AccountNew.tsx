import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import { AccountGetDto } from "../../../interfaces/Account";
import { useRouter } from "next/router";

export const getAccount = async (account: AccountGetDto) => {
  return request({
    url: `account`,
    method: "get",
    data: account,
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation(getAccount, {
    onSuccess: (data) => {
      toast.success(`Get Account`);
    },
    onError: () => {
      toast.error("Get Account Failed");
    },
    onSettled: () => {},
  });
};
