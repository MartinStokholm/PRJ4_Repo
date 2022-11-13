import React from "react";
import WorkoutList from "./WorkoutList";
import Button from "./Button";
const CalenderColumn = ({ day }) => {
  return (
    <div className="border mb-4">
      <h1>{day}</h1>
      <Button text="Add Workout" />
      <Button text="Add Meal" />
      <h1>your workout here</h1>
      <h1>your meal here</h1>
    </div>
  );
};

export default CalenderColumn;
