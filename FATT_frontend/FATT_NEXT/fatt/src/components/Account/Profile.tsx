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

  const { age, email, gender, name, weigth } = profileData?.data;

  return (
    <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex">
        <h1 className="m-2">Email:</h1>
        <h1 className="m-2">{email}</h1>
      </div>
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex">
        <h1 className="m-2">Name:</h1>
        <h1 className="m-2">{name}</h1>
      </div>
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex">
        <h1 className="m-2">Gender:</h1>
        <h1 className="m-2">{gender}</h1>
      </div>
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex">
        <h1 className="m-2">Age:</h1>
        <h1 className="m-2">{age}</h1>
      </div>
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex">
        <h1 className="m-2">Weigth:</h1>
        <h1 className="m-2">{weigth}</h1>
        <h1 className="m-2">kg</h1>
      </div>
    </div>
  );
};

export default Profile;
