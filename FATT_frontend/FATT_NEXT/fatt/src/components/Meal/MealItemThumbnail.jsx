import Link from "next/link";
const MealItemThumbnail = ({ dish }) => {
  return (
    <>
      <Link href={{ pathname: `/dish/${dish.id}` }} key={dish.id}>
        <div className="hover:bg-green-50 grid grid-cols-[80%_20%] w-full items-center">
          <h1 className="ml-2 justify-self-start">{dish.name}</h1>
          <img src={dish.picturePath} className="h-20" />
        </div>
      </Link>
    </>
  );
};

export default MealItemThumbnail;
