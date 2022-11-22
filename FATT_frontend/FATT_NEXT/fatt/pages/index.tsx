import React, { useEffect, useState } from "react";
import Link from "next/link";

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
      <Link href="/calender"> My FATT Calender</Link>
      <h1>Welcome {name}</h1>
    </div>
  );
}
