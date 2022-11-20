import React, { useEffect } from "react";
import CalenderColumn from "./CalenderColumn";
export default function Calender() {
  return (
    <>
      <div className="flex flex-wrap justify-center border rounded border-green-500 pt-4">
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
