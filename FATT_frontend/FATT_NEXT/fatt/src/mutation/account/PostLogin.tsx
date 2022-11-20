import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import { AccountLoginDto } from "../../../interfaces/Account";
import axios from "axios";
import { NextResponse } from "next/server";
import { server } from "../../../config/config";
import { useRouter } from "next/router";

export const login = async (account: AccountLoginDto) => {
  const response = await axios({
    url: `${server}account/login`,
    method: "post",
    data: account,
  });
  console.log(response.data);
  localStorage.setItem("token", response.data);
};

export const useLogin = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (newAccount) => {
      toast.success(`Login`);
      return Promise.resolve(router.push("/"));
    },
    onError: (_error, _account, context) => {
      toast.error("Creating Account Failed");
    },
  });
};
