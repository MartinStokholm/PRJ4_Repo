import MealItemThumbnail from "./MealItemThumbnail";
import Link from "next/link";
import DeleteButton from "../Button/DeleteButton";
import MealModal from "./CreateMealModal";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../util/Modal";
import ModalDropdown from "../util/ModalDropdown";
import { useDeleteMeal } from "../../mutation/meal/DeleteMeal";
import AddMealToCalendarModal from "./AddMealToCalendarModal";
import Heading from "../Layout/Heading";

const MealList = ({ mealData, dishData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAddToCalendarModal, setShowAddToCalendarModal] = useState(false);
  const [idPassToModal, setIdPassToModal] = useState();
  const { mutate: deleteMeal } = useDeleteMeal();

  const handleDeleteButtonClick = (mealId: number) => {
    deleteMeal(mealId);
  };

  return (
    <div>
      <Heading text="My Personal Meals" />
      <div className="text-center">
        <Button
          onClick={() => setShowModal(true)}
          text={"Create Meal"}
          key={undefined}
        />
      </div>

      <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
        <MealModal />
      </Modal>

      <ModalDropdown
        IsVisible={showAddToCalendarModal}
        onClose={() => setShowAddToCalendarModal(false)}
      >
        <AddMealToCalendarModal id={idPassToModal} />
      </ModalDropdown>

      <div className="flex flex-wrap justify-center">
        {/* This maps out all workouts with their exercise as names */}
        {mealData.data?.map((meal) => (
          <div
            key={meal.name}
            className="rounded bg-white shadow-lg w-full md:w-1/3 m-4 flex flex-col justify-center"
          >
            <div className="flex flex-col justify-center">
              <Link
                href={{ pathname: `/meal/${meal.id}` }}
                key={meal.id}
                className="hover:bg-green-50 hover:shadow-inner flex justify-center"
              >
                <h1 className="m-2 font-bold py-1">{meal.name}</h1>
              </Link>
            </div>
            <div>
              {dishData?.data.map((dish) =>
                meal?.dishesIds?.includes(dish.id) ? (
                  <div
                    key={dish.id}
                    className="bg-white overflow-hidden shadow-lg mx-4 my-4"
                  >
                    <MealItemThumbnail dish={dish} />
                  </div>
                ) : null
              )}
            </div>
            <DeleteButton
              text={"Delete"}
              onClick={() => {
                handleDeleteButtonClick(meal.id);
              }}
            />
            <Button
              text={"Add To Calendar"}
              onClick={() => {
                setShowAddToCalendarModal(true);
                setIdPassToModal(meal.id);
              }}
              key={undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;
