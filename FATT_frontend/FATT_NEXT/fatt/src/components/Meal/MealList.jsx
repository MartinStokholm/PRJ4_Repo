import MealItemThumbnail from "./MealItemThumbnail";
import Link from "next/link";

const MealList = ({ mealData, dishData }) => {
  return (
    <>
      {mealData.data?.map((meal) => (
        <div
          key={meal.name}
          className="hover:bg-green-50 rounded bg-white shadow-lg w-full md:w-1/3 m-4"
        >
          <Link
            href={{ pathname: `/meal/${meal.id}` }}
            key={meal.id}
            className="mt-4"
          >
            <h1 className="mt-4 font-bold">{meal.name}</h1>
            <h2 className="italic">{meal.category}</h2>

            {dishData?.data.map((dish) =>
              meal.dishIds.includes(dish.id) ? (
                <div
                  key={dish.id}
                  className="bg-white overflow-hidden shadow-lg mx-4 my-4"
                >
                  <MealItemThumbnail dish={dish} />
                </div>
              ) : null
            )}
          </Link>
        </div>
      ))}
    </>
  );
};

export default MealList;
