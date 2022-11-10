import LoadingSpinner from "../src/components/LoadingSpinner";
import { useGetCalendar } from "../src/hooks/GetCalandar";
export default function HomePage() {
  //Just temp account id
  const accountId = 1;
  //Get calender for an account from
  // Gets internal server error when getting
  // const { data: Calendars } = useGetCalendar(accountId.valueOf());

  return (
    <>
      <LoadingSpinner />
      {/* 
        Get calender for an account from 
        https://localhost:7257/api/Calenders/{accountId} 
       
        Put workout on calender from
        https://localhost:7257/api/Calenders/{accountId}/AddWorkout/{workoutId}
        Right now the date is hard coded to be the time of adding the workout
       */}

      {}
    </>
  );
}
