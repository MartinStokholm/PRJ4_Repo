import ExerciseItemThumbnail from "./ExerciseItemTHumbnail";

const ExerciseList = ({ data }) => {
  return (
    <>
      {data?.data.map((exercise) => {
        return (
          <div key={exercise.id} className="w-1/3 mb-4 px-2">
            {" "}
            {<ExerciseItemThumbnail exercise={exercise} />}
          </div>
        );
      })}
    </>
  );
};

export default ExerciseList;
