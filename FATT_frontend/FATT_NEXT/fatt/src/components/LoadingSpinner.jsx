import { Spinner } from "flowbite-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center item-center content-center">
      <Spinner size="xl" color="success"></Spinner>
    </div>
  );
};

export default LoadingSpinner;
