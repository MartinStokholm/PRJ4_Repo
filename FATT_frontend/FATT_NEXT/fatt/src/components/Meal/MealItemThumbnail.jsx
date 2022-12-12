import Link from "next/link";
const MealItemThumbnail = ({ dish }) => {
  return (
    <>
      <div className="flex items-center w-full ">
        <Link
          href={{ pathname: `/dish/${dish.id}` }}
          key={dish.id}
          className="flex content-center items-center hover:bg-green-50 w-full hover:shadow-inner hover:text-green-400"
        >
          <img src={dish.picturePath} className="h-10" />
          <h1 className="my-auto mx-auto md:mx-4">{dish.name}</h1>
        </Link>
      </div>
    </>
  );
};

export default MealItemThumbnail;
