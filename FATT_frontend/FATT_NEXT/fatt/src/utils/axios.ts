import axios from "axios";
import { server } from "../../config/config";
import { redirect } from "next/dist/server/api-utils";
import { middleware } from "../components/Redirect";
import { useRouter } from "next/router";
import { useHistory } from "react-router-dom";
// export declare function redirect(res: NextApiResponse, statusOrUrl: string | number, url?: string): NextApiResponse<any>;

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
