import { useQuery } from "react-query";
import fecthdishs from "../fetchers/dishs";

export const useDishsData = (onSuccess, onError) => {
  return useQuery("dishsKey", fecthdishs, {
    onSuccess,
    onError,
  });
};
