import React from "react";

import Button from "./Button";
const CalenderItem = () => {
  return (
    <div className="grid-rows-4 border">
      <Button text="Add Workout" />
      <Button text="Add Meal" />
      <h1>your workout here</h1>
      <h1>your meal here</h1>
    </div>
  );
};

export default CalenderItem;
