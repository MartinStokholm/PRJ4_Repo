import ExerciseItemThumbnail from "./ExerciseItemTHumbnail";

const ExerciseList = ({ data }) => {
  return (
    <>
      {data?.data.map((exercise) => {
        return (
          <div key={exercise.id} className="w-1/2 md:w-1/4 mb-4 px-4 md:px-12">
            {" "}
            {<ExerciseItemThumbnail exercise={exercise} />}
          </div>
        );
      })}
    </>
  );
};

export default ExerciseList;
