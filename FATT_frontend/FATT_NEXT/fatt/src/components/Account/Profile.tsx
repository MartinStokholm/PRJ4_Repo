import React from "react";
import { getAccount } from "../../queries/AccountNew";

const onSuccess = (data) => {
  console.log("Perform side effect after data fetching", data);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};
const Profile = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string, 10);
  const { isLoading, data, isError, error } = getAccount(
    email,
    onSuccess,
    onError
  );

  return (
    <div>
      <h1>My Profile</h1>
      <h2>Name</h2>
      <h2>Email</h2>
      <h2>Gender</h2>
      <h2>Weight</h2>
      <h2>Age</h2>
    </div>
  );
};

export default Profile;
