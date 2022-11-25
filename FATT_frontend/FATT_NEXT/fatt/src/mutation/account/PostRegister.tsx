import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import type { AccountNoIdDto } from "../../../interfaces/Account";

export const register = async (account: AccountNoIdDto) => {
  return await request({
    url: `account/register`,
    method: "post",
    data: account,
  });
};

export const useRegister = (onSettled) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation(register, {
    onSuccess: (newAccount) => {
      console.log(newAccount);
      toast.success(`Account Created "${newAccount.data}"`);
    },
    onError: (_error, _account) => {
      console.log("me here in error");
      toast.error("Creating Account Failed");
    },
    onSettled: (newAccount) => {
      console.log("me here in settled");
      return Promise.resolve(router.push("/login"));
    },
  });
};
