import React, { useEffect } from "react";
import CalenderColumn from "./CalenderColumn";
export default function Calender({ workoutData, exerciseData }) {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <CalenderColumn day="Monday" />
        <CalenderColumn day="Tuesday" />
        <CalenderColumn day="Wednesday" />
        <CalenderColumn day="Thursday" />
        <CalenderColumn day="Friday" />
        <CalenderColumn day="Saturday" />
        <CalenderColumn day="Sunday" />
      </div>
    </>
  );
}
