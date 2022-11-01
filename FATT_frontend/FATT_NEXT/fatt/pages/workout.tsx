import Image from "next/image";
import { ReactQuery } from "../src/components/ReactQuery";
import { useQuery } from "react-query";
import fecthWorkouts from "../src/fetchers/workout";

export default function Workout() {
  const { isLoading, data, isError, error } = useQuery(
    "workoutsKey",
    fecthWorkouts,
    {
      refetchOnWindowFocus: true,
    }
  );

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      <h2>Workouts</h2>
      {data?.data.map((workout) => (
        <div key={workout.name}>{workout.name} </div>
      ))}
    </div>
  );
}
