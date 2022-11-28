import React from "react";
import Link from "next/link";

const MealPlanColoumn = ({ mealDays, mealData, day }) => {
  switch (day) {
    case "Monday":
      var Day = mealDays?.monday;
      break;
    case "Tuesday":
      var Day = mealDays?.tuesday;
      break;
    case "Wednesday":
      var Day = mealDays?.wednesday;
      break;
    case "Thursday":
      var Day = mealDays?.thursday;
      break;
    case "Friday":
      var Day = mealDays?.friday;
      break;
    case "Saturday":
      var Day = mealDays?.saturday;
      break;
    case "Sunday":
      var Day = mealDays?.sunday;
      break;
    default:
      break;
  }

  return (
    <div className="m-4 border-t-2 border-b-2 rounded border-green-200 p-2">
      <h1>{day}</h1>
      {Day?.map((mealId) => {
        const meal = mealData?.data.find((meal) => meal.id === mealId);
        return (
          <div key={mealId} className="flex flex-col">
            <Link href={`/meal/${mealId}`}>
              <h1 className="text-green-400 hover:bg-green-100 hover:italic hover:border-l-8 hover:border-green-500 px-2 py-1 rounded-r">
                {meal?.name}
              </h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MealPlanColoumn;
