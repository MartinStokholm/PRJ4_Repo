
import { useQuery } from "react-query";
import fecthWorkouts from "../fetchers/workout";

export const useWorkoutsData = (onSuccess, onError) => {
    return useQuery(
      "workoutKey", 
      fecthWorkouts, 
      { 
        refetchOnWindowFocus: true, 
        onSuccess,
        onError,
        // select: (data) => {
        //   const exerciseName = data.data.map((workout) => workout.name);
        //   return exerciseName;
        // },
      }
    );
}
