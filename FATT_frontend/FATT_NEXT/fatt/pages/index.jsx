import React from "react";
import Link from "next/link";
import Calender from "../src/components/Calendar/Calender";
export default function HomePage() {
  const name = localStorage.getItem("name");
  return (
    <div>
      <h1>{name}'s FATT Calender:</h1>
      <Calender />
    </div>
  );
}
