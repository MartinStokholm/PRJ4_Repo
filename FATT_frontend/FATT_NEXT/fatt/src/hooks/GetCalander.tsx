import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const getCalendar = async (accountId) => {
  return request({ url: `Calenders/${accountId}`, method: "get" });
};

export const useGetCalendar = (accountId) => {
  return useQuery("calendarsKey", getCalendar, {});
};
