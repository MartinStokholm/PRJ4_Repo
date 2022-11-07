import Link from "next/link";
import ExerciseItemThumbnail from "./ExerciseItemTHumbnail";

const ExerciseList = ({ data }) => {
  return (
    <>
      {data?.data.map((exercise) => {
        return (
          <div key={exercise.id}>
            {" "}
            {
              <Link
                href={{ pathname: `/exercise/${exercise.id}` }}
                key={exercise.id}
              >
                <ExerciseItemThumbnail exercise={exercise} />
              </Link>
            }
          </div>
        );
      })}
    </>
  );
};

export default ExerciseList;
