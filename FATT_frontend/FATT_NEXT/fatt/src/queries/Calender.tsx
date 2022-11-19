import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const fetchCalender = async ({ queryKey }) => {
  const id = queryKey[1];
  return request({ url: `Calenders/${id}`, method: "get" });
};

export const GetCalender = (id) => {
  return useQuery([`calendersKey`, id], fetchCalender, {});
};
