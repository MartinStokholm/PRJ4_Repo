import { useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios";
import { toast } from "react-toastify";
import { AccountLoginDto } from "../../../interfaces/Account";
import axios from "axios";
import { NextResponse } from "next/server";
import { server } from "../../../config/config";

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
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (newAccount) => {
      toast.success(`Login`);
      //useRouter().push("/login");
      // () => middleware();
    },
    onError: (_error, _account, context) => {
      toast.error("Creating Account Failed");
    },
  });
};

// fetch("http://localhost:4000/Register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(post),
//   }).then(() => {
//     props.history.push("/");
//   });
// };
