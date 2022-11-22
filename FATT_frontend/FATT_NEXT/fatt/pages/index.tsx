import React, { useEffect, useState } from "react";
import Link from "next/link";
import Calender from "../src/components/Calendar/Calender";
export default function HomePage() {
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("name")) {
        setName(localStorage.getItem("name") as string);
      } else setName("User");
    }
  }, []);

  return (
    <div>
      <h1>{name}'s FATT Calender</h1>
      <Calender />
    </div>
  );
}
