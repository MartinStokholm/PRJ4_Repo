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

export const useRegister = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation(register, {
    onSuccess: (newAccount) => {
      toast.success(`Account Created "${newAccount.data}"`);
    },
    onError: (_error, _account) => {
      toast.error("Creating Account Failed");
    },
    onSettled: () => {
      // Can push them to other site thats not auht then we cast back to this site... lol
      return Promise.resolve(router.push("/"));
    },
  });
};
