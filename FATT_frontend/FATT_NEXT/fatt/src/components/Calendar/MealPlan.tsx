import React from "react";
import Link from "next/link";

const MealPlan = ({ mealDays, mealData }) => {
  return (
    <div className="flex flex-wrap justify-center border rounded border-green-500 pt-4">
      {mealDays?.map((mealDay) => (
        <div key={mealDay.id} className="border rounded m-2">
          <h1>{mealDay.day}</h1>
          {mealData?.data?.map((meal) => {
            {
              /*match mealDays.mealId with meal id from users meals*/
            }
            if (meal.id === mealDay.mealId) {
              return (
                <div key={meal.id}>
                  <div className="flex flex-col justify-center ">
                    <Link
                      href={{ pathname: `/meal/${meal.id}` }}
                      key={meal.id}
                      className="hover:bg-green-50 hover:shadow-inner flex justify-center"
                    >
                      <h1 className="m-2 font-bold py-1">{meal.name}</h1>
                    </Link>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default MealPlan;
