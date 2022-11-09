import Link from "next/link";
const WorkoutItemThumbnail = ({ exercise }) => {
  return (
    <>
      <Link href={{ pathname: `/exercise/${exercise.id}` }} key={exercise.id}>
        <div className="hover:bg-blue-400 grid grid-cols-[80%_20%] w-full items-center">
          <h1 className="ml-2 justify-self-start">{exercise.name}</h1>
          <img src={exercise.picturePath} className="h-20" />
        </div>
      </Link>
    </>
  );
};

export default WorkoutItemThumbnail;
