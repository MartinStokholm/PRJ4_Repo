// import Exercises from '../../interfaces/Exercises';
import exerciseHandler from "./api/exercise/[id]";
import HeadComponent from "../src/components/Meta";
import Image from "next/image";
import Link from "next/link";
import type { Exercise } from "../interfaces/Exercises";
import { useQuery } from "react-query";
import axios from "axios";
import fecthExercises  from "../src/fetchers/exercise";



export default function ExercisePage() {
  const {isLoading, data, isError, error } = useQuery(
    'exerciseKey', 
    fecthExercises,
     {
    //   cacheTime: 50000, // Default is 5 minuts
    //   staleTime: 30000, // If we don't need update much and first update after 30 seconds
    //   refetchOnMount: false, // Will no opdate when page is called
    //   refetchInterval: 2000, // the query will automatic refresh every 2 seconds
    //   refetchIntervalInBackground: true, // will update automatic in background
       refetchOnWindowFocus: true // Every time your tab loose focus and we gain it again it updates
                                  // In other words list will automated update when change in db
     } 
  )
  

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError){
    return <h2>{error.message}</h2>
  }


  return (
    <div>
      <h2>Exercises</h2>
      {data?.data.map(exercise =>{
        return <div key={exercise.name}>{exercise.name} </div> 
        })}
    </div>
  );
}


{/* <ul>
{data.map((exercise) => (
  <li key={exercise.id}>
    <Link href="/user/[id]" as={`/user/${exercise.id}`} legacyBehavior>
      {`User ${exercise.id}`}
    </Link>
  </li>
))}
</ul> */}
// export const getStaticExercises = async () => {
//     const res = await fetch($`{server}/api/Exercise`)
//     const exercises = await res.json()

//     return {
//         props:
//         {
//             exercises,
//         },
//     }
// }
