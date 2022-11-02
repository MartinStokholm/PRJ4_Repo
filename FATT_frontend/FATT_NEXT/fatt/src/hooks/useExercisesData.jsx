
import { useQuery } from "react-query";
import fecthExercises from "../fetchers/exercise";

export const useExercisesData = (onSuccess, onError) => {
    return useQuery(
      "exerciseKey", 
      fecthExercises, 
      { 
        enabled: false, 
        refetchOnWindowFocus: true, 
        onSuccess,
        onError,
        select: (data) => {
          const exerciseName = data.data.map((exercise) => exercise.name);
          return exerciseName;
        },
      }
    );
}

// export const useExercisesData = (onSuccess, onError) => {
//     return useQuery(
//         "exerciseKey", //Key
//         fecthExercises, //Fetch function
//         { // Specifiction
//           enabled: false, // Disable loading when the exercisePage is loading
//           //   cacheTime: 50000, // Default is 5 minuts
//           //   staleTime: 30000, // If we don't need update much and first update after 30 seconds
//           //   refetchOnMount: false, // Will no opdate when page is called
//           //   refetchInterval: 2000, // the query will automatic refresh every 2 seconds
//           //   refetchIntervalInBackground: true, // will update automatic in background
//           refetchOnWindowFocus: true, // Every time your tab loose focus and we gain it again it updates
//           // In other words list will automated update when change in db
//           onSuccess: onSuccess, // This function is calledback function
//           onError, // Key value is the same as the key, so we can drop writing the key
//           select: (data) => {
//             const exerciseName = data.data.map((exercise) => exercise.name);
//             return exerciseName;
//           },
//         }
//       );
//     }