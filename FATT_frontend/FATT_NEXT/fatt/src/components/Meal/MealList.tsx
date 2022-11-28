import DeleteButton from "../Button/DeleteButton";
import CreateMealModal from "./CreateMealModal";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../util/Modal";
import ModalDropdown from "../util/ModalDropdown";
import { useDeleteMeal } from "../../mutation/meal/DeleteMeal";
import AddMealToCalendarModal from "./AddMealToCalendarModal";
import Heading from "../Layout/Heading";
import MealHeader from "./MealHeader";

const MealList = ({ mealData }) => {
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
      <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
        <div className="text-center">
          <Button onClick={() => setShowModal(true)} text={"Create Meal"} />
        </div>

        <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
          <CreateMealModal />
        </Modal>

        <ModalDropdown
          IsVisible={showAddToCalendarModal}
          onClose={() => setShowAddToCalendarModal(false)}
        >
          <AddMealToCalendarModal
            id={idPassToModal}
            onClose={() => setShowModal(false)}
          />
        </ModalDropdown>

        <div className="flex flex-wrap justify-center">
          {/* This maps out all workouts with their exercise as names */}
          {mealData.data?.map((meal) => (
            <div
              key={meal.name}
              className="rounded bg-white shadow-lg md:w-1/3 m-4 flex flex-col justify-center"
            >
              <MealHeader meal={meal} />
              <Button
                text={"Add To Calendar"}
                onClick={() => {
                  setShowAddToCalendarModal(true);
                  setIdPassToModal(meal.id);
                }}
                key={undefined}
              />

              <DeleteButton
                text={"Delete"}
                onClick={() => {
                  handleDeleteButtonClick(meal.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealList;
