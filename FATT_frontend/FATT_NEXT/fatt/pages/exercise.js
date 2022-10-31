// import Exercises from '../../interfaces/Exercises';
import exerciseHandler from "./api/exercise/[id]";
import HeadComponent from "../src/components/HeadComponent";
import Image from "next/image";

export default function ExercisePage() {
  // () => exerciseHandler(Exercises, Exercises);

  return <div className="grid-container"></div>;
}

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
