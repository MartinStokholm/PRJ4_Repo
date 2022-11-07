import Youtube from "react-youtube";

const ExerciseItem = ({ exercise }) => {
  const videoUrl = exercise?.data?.videoPath;
  const videoId = videoUrl?.split("be/")[1];

  return (
    <div className="bg-white max-w-m rounded overflow-hidden shadow-lg content-center h-200">
      <h1> {exercise?.data.name}</h1>
      <h2>Category: {exercise?.data.category}</h2>
      <h3>Intenisty: {exercise?.data.intensity}</h3>

      <img src={exercise?.data.picturePath} width="500px" />

      <div>
        <p>Equipment: {exercise?.data.equipment}</p>
        <p>Repetities: {exercise?.data.repetitions}</p>
        <p>Sets: {exercise?.data.sets}</p>
      </div>

      <p>Video showing how to perform {exercise?.data.name}</p>
      <Youtube videoId={videoId} />
    </div>
  );
};

export default ExerciseItem;
