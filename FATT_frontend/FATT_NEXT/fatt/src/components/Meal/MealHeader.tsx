import Link from "next/link";

const MealItem = ({ meal }) => {
  var dishesCount = 0;
  if (meal.dishes) {
    dishesCount = meal.dishes.length;
  }
  return (
    <div className="flex flex-col justify-center">
      <Link
        href={{ pathname: `/meal/${meal.id}` }}
        key={meal.id}
        className="hover:bg-green-50 hover:shadow-inner flex justify-center"
      >
        <h1 className="m-2 font-bold py-1">{meal.name}</h1>

        <h2 className="m-2 italic py-1">{dishesCount} dishes</h2>
      </Link>
    </div>
  );
};

export default MealItem;
