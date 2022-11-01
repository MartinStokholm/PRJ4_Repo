import axios from "axios";

export const fetchAccounts = async () => {
  console.log("Fetching Accounts");
  const response = await axios.get(`${server}account`)
  const account = response.data;

  console.log("Account:", account);
  return account;
};
