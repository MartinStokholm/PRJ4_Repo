import axios from "axios";
import { server } from "../../config/config";

export const fetchAccounts = async () => {
  console.log("Fetching Accounts");
  const response = await axios.get(`${server}account`);
  const account = response.data;

  console.log("Account:", account);
  return account;
};
