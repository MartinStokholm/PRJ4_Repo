import axios from "axios";
import { server } from "../../config/config";
import { useRouter } from "next/router";

const client = axios.create({ baseURL: server });

const getToken = () => {
  return localStorage.getItem("token");
};

export const SetupInterceptors = () => {
  const router = useRouter();
  client.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      var status = error.response.status;
      if (status === 401) {
        return router.push("/login");
      }
      return error;
    }
  );
};

export const request = ({ ...options }) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
  const onSuccess = (response) => {
    return response;
  };
  const onError = (error) => {
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
