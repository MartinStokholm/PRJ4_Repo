import LoadingSpinner from "../src/components/LoadingSpinner";
import { useGetCalender } from "../src/hooks/GetCalander";
export default function HomePage() {
  //Just temp account id
  const accountId = 1;
  //Get calender for an account from
  const { data: Calenders } = useGetCalender(accountId);

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
