import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const fetchAccountProfile = async () => {
  return request({
    url: `account/${localStorage.getItem("email")}`,
    method: "get",
  });
};

export const getAccountProfile = (onError) => {
  return useQuery([`accountKey`], fetchAccountProfile, {
    onError,
  });
};
