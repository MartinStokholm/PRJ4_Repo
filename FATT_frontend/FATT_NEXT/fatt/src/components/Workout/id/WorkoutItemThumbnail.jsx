import Link from "next/link";
const WorkoutItemThumbnail = ({ exercise }) => {
  return (
    <>
      <div className="flex items-center w-full ">
        <Link
          href={{ pathname: `/exercise/${exercise.id}` }}
          key={exercise.id}
          className="flex hover:bg-green-50 w-full hover:shadow-inner hover:text-green-400"
        >
          <img src={exercise.picturePath} className="h-10" />
          <h1 className="my-auto mx-auto md:mx-4">{exercise.name}</h1>
        </Link>
      </div>
    </>
  );
};

export default WorkoutItemThumbnail;
