import LoadingSpinner from "../src/components/LoadingSpinner";

export default function HomePage() {
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
