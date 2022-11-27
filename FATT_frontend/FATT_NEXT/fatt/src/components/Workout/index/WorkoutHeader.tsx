import Link from "next/link";

const WorkoutElement = ({ workout }) => {
  return (
    <div className="flex flex-col justify-center">
      <Link
        href={{ pathname: `/workout/${workout.id}` }}
        key={workout.id}
        className="hover:bg-green-50 hover:shadow-inner flex justify-center"
      >
        <h1 className="m-2 font-bold py-1">{workout.name}</h1>

        <h2 className="m-2 italic py-1">{workout.duration}</h2>
      </Link>
    </div>
  );
};

export default WorkoutElement;
