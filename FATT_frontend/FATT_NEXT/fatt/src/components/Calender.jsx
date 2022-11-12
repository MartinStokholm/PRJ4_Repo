import React, { useEffect } from "react";
import CalenderItem from "./CalenderItem";
export default function Calender() {
  return (
    <>
      <div claddName="flex items-center justify-center h-screen">
        <div className="grid grid-rows-3 gap-4 border auto-rows-auto ">
          {" "}
          <h1>My FATT calender</h1>
          <div className="grid grid-cols-1 bg-blue-300 md:grid-cols-1">
            <h2>monday</h2>
            <h2>tuesday</h2>
            <h2>wednesday</h2>
            <h2>thursday</h2>
            <h2>friday</h2>
            <h2>saturday</h2>
            <h2>sunday</h2>
          </div>
          <div className="grid grid-cols-1 bg-blue-300 md:grid-cols-1">
            <CalenderItem />
            <h2>3</h2>
            <h2>4</h2>
            <h2>2</h2>
            <h2>5</h2>
            <h2>6</h2>
            <h2>7</h2>
          </div>
        </div>
      </div>
    </>
  );
}
