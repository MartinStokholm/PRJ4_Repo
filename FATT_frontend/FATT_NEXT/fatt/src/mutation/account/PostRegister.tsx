import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useLogin } from "./PostLogin";
import type { AccountNoIdDto } from "../../../interfaces/Account";

export const register = async (account: AccountNoIdDto) => {
  return await request({
    url: `account/register`,
    method: "post",
    data: account,
  });
};

export const useRegister = () => {
  const router = useRouter();
  const { mutate: login } = useLogin();

  const queryClient = useQueryClient();
  return useMutation(register, {
    onSuccess: (newAccount) => {
      console.log("me here in succes");
      toast.success(`Account Created "${newAccount.data.name}"`);
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
