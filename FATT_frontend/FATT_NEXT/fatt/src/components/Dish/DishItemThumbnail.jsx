import Link from "next/link";
const DishItemThumbnail = ({ dish }) => {
  return (
    <div className="bg-white max-w-sm rounded overflow-hidden shadow-lg content-center h-200">
      <Link
        className="w-full block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-green-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        href={{ pathname: `/dish/${dish.id}` }}
        key={dish.id}
      >
        <img src={dish.picturePath} className="w-full" />
        <h1>{dish.name}</h1>
        <h2>{dish.category}</h2>
      </Link>
    </div>
  );
};

export default DishItemThumbnail;
