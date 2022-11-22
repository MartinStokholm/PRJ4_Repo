import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import { AccountDeleteDto } from "../../../interfaces/Account";
import { useRouter } from "next/router";

export const deleteAccount = async (account: AccountDeleteDto) => {
  return request({
    url: `account`,
    method: "delete",
    data: account,
  });
};

export const useDeleteAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(deleteAccount, {
    onSuccess: (data) => {
      toast.success(`Deleted Account`);
      localStorage.removeItem("token");
      router.push("/");
    },
    onError: () => {
      toast.error("Deleting Account Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("accountKey");
    },
  });
};
