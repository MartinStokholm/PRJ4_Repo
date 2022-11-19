import axios from "axios";
import { server } from "../../config/config";

const client = axios.create({ baseURL: server });

const getToken = () => {
  return localStorage.getItem("token");
};

export const request = ({ ...options }) => {
  const token = getToken();
  console.log(token);
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    // Optionally catch errors and add addition logging here
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

// Bearer token is just temporarily
// Need to find a way to implement the token from web api
