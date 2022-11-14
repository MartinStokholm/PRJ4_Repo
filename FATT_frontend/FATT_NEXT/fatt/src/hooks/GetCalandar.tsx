import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const getCalendar = async ({ queryKey }) => {
  const id = queryKey[1];
  return request({ url: `Calenders/${id}`, method: "get" });
};

export const useGetCalendar = (id) => {
  return useQuery([`calendarsKey`, id], getCalendar, {});
};
