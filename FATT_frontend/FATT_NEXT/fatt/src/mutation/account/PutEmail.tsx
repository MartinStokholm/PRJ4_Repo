import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import type { AccountChangeEmailDto } from "../../../interfaces/Account";

export const updateEmail = async (email: AccountChangeEmailDto) => {
  return request({
    url: `account/changeemail`,
    method: "put",
    data: email,
  });
};

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEmail, {
    onSuccess: (data) => {
      toast.success(`Updated Email`);
    },
    onError: () => {
      toast.error("Updating Email Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("accountKey");
    },
  });
};
