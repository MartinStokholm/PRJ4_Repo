import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const fetchCalender = async () => {
  return request({
    url: `account/${localStorage.getItem("email")}/calender/`,
    method: "get",
  });
};

export const getCalender = (onError) => {
  return useQuery([`calenderKey`], fetchCalender, {
    onError,
  });
};
