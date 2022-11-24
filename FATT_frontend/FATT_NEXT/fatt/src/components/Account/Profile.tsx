import React from "react";
import LoadingSpinner from "../Layout/LoadingSpinner";
import { getAccountProfile } from "../../queries/AccountProfile";
import Error from "next/error";

const onSuccess = (profileData) => {
  console.log("Perform side effect after data fetching", profileData);
};

const onError = (error) => {
  console.log(`Perform side effect after encountered error\n ${error}`);
};
const Profile = () => {
  const {
    isLoading,
    data: profileData,
    isError,
    error,
  } = getAccountProfile(onError);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error statusCode={(error as any).message} />;
  }

  const { age, email, gender, name, weight } = profileData?.data;

  return (
    <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg ">
      <h3>My Email: {email}</h3>
      <h3>My Name: {name}</h3>
      <h3>My Age: {age}</h3>
      <h3>My Gender: {gender}</h3>
      <h3>My Weight: {weight}</h3>
    </div>
  );
};

export default Profile;
