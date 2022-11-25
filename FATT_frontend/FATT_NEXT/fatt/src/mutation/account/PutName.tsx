import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";

export const updateName = async (name: string) => {
  return request({
    url: `account/${localStorage.getItem("email")}/name/${name}`,
    method: "put",
    data: name,
  });
};

export const useUpdateName = () => {
  const queryClient = useQueryClient();
  return useMutation(updateName, {
    onSuccess: (data) => {
      toast.success(`Updated Name`);
    },
    onError: () => {
      toast.error("Updating Name Failed");
    },
    onSettled: () => {
      queryClient.invalidateQueries("accountKey");
    },
  });
};
