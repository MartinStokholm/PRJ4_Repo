import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const updateGender = async (gender: string) => {
  return request({
    url: `account/${localStorage.getItem("email")}/gender/${gender}`,
    method: "put",
    data: gender,
  });
};

export const useUpdateGender = () => {
  const queryClient = useQueryClient();
  return useMutation(updateGender, {
    onSuccess: (data) => {
      toast.success(`Updated Gender`);
    },
    onError: () => {
      toast.error("Updating Gender Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("accountKey");
    },
  });
};
