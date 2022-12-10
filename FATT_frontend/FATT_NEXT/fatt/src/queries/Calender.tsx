import { useQuery } from "react-query";
import { request } from "../utils/axios";

export const FetchCalender = async () => {
  return request({
    url: `account/${localStorage.getItem("email")}/calender/`,
    method: "get",
  });
};

export const GetCalender = (onError) => {
  return useQuery([`calenderKey`], FetchCalender, {
    onError,
  });
};
