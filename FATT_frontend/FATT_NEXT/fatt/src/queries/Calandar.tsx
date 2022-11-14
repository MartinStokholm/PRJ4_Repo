import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const fetchCalendar = async ({ queryKey }) => {
  const id = queryKey[1];
  return request({ url: `Calenders/${id}`, method: "get" });
};

export const GetCalendar = (id) => {
  return useQuery([`calendarsKey`, id], fetchCalendar, {});
};
