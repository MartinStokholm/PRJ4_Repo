import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const FetchAccountProfile = async () => {
  return request({
    url: `account/${localStorage.getItem("email")}`,
    method: "get",
  });
};

export const GetAccountProfile = (onError) => {
  return useQuery([`accountKey`], FetchAccountProfile, {
    onError,
  });
};
