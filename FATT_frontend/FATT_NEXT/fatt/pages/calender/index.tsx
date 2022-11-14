import Calender from "../../src/components/Calender";
import { useGetCalendar } from "../../src/hooks/GetCalandar";
export default function CalenderPage() {
  //Just temp account id
  const accountId = 1;
  //Get calender for an account from
  // Gets internal server error when getting
  // const { data: Calendars } = useGetCalendar(accountId.valueOf());

  return (
    <>
      <Calender />
    </>
  );
}
