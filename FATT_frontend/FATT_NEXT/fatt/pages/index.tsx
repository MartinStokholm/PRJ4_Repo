import React, { useEffect, useState } from "react";
import Link from "next/link";
import Calender from "../src/components/Calendar/Calender";
import { getCalender } from "../src/queries/Calender";
import { toast } from "react-toastify";

const onError = (error) => {
  toast.error(`${error}`);
};

export default function HomePage() {
  const [name, setName] = useState("");
  const { data: calendarData, error } = getCalender(onError);

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
      <Calender calendarData={calendarData?.data} />
    </div>
  );
}
