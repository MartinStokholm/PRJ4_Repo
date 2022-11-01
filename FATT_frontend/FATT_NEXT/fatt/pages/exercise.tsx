// import Exercises from '../../interfaces/Exercises';
import exerciseHandler from "./api/exercise/[id]";
import HeadComponent from "../src/components/HeadComponent";
import Image from "next/image";
import Link from "next/link";
import type { Exercise } from "../interfaces/Exercises";
import useSwr from "swr";
import cors from "cors";

export default function ExercisePage() {
  // () => exerciseHandler(Exercises, Exercises);
  const allowedOrigins = ["http://localhost:7257"];

  const fetcher = (url: string) =>
    fetch("https://localhost:7257").then((res) => res.json());

  //const urlstring = (url: string) => fetch(url).then((res) => res.json());
  // Add a list of allowed origins.
  // If you have more origins you would like to add, you can add them to the array below.

  const { data, error } = useSwr<Exercise[]>("/api/exercises", fetcher);

  if (error) return <div>Failed to load exercises</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {data.map((exercise) => (
          <li key={exercise.id}>
            <Link href="/user/[id]" as={`/user/${exercise.id}`} legacyBehavior>
              {`User ${exercise.id}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
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
