import Youtube from "react-youtube";

const ExerciseItem = ({ exercise }) => {
  const videoUrl = exercise?.data?.videoPath;
  const videoId = videoUrl?.split("be/")[1];

  return (
    <div className="bg-white max-w-m rounded overflow-hidden shadow-lg flex flex-col justify-center items-center">
      <h1 className="bg-green-50"> {exercise?.data.name}</h1>
      <h2>Category: {exercise?.data.category}</h2>
      <h3>Intensity: {exercise?.data.intensity}</h3>

      <img
        className="text-center"
        src={exercise?.data.picturePath}
        width="500px"
      />

      <div>
        <p>Equipment: {exercise?.data.equipment}</p>
        <p>Repetitions: {exercise?.data.repetitions}</p>
        <p>Sets: {exercise?.data.sets}</p>
      </div>

      <p>Video showing how to perform {exercise?.data.name}</p>
      <Youtube videoId={videoId} />
    </div>
  );
};

export default ExerciseItem;
