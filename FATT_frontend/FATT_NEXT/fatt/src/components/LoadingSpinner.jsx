import { Spinner } from "flowbite-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="text-center mt-24">
      <Spinner size="xl" color="success"></Spinner>
    </div>
  );
};

export default LoadingSpinner;
