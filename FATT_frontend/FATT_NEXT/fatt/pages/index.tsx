import Calender from "../src/components/Calendar/Calender";
import { getCalender } from "../src/queries/Calender";
import { toast } from "react-toastify";
import Heading from "../src/components/Layout/Heading";

const onError = (error) => {
  toast.error(`${error}`);
};

export default function HomePage() {
  const { data: calendarData, error } = getCalender(onError);

  return (
    <div>
      <div className="flex justify-center">
        <Heading text="My Personal Calendar" />
      </div>
      <Calender calendarData={calendarData?.data} />
    </div>
  );
}
