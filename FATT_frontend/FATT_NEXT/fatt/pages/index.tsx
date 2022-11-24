import React, { useEffect, useState } from "react";
import Calender from "../src/components/Calendar/Calender";
import { getCalender } from "../src/queries/Calender";
import { toast } from "react-toastify";
import Heading from "../src/components/Layout/Heading";

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
      <div className="flex justify-center">
        <Heading text="My Personal Calendar" />
      </div>
      <Calender calendarData={calendarData?.data} />
    </div>
  );
}
