import MealItemThumbnail from "./MealItemThumbnail";
import Button from "../Button/Button";
import DeleteButton from "../Button/DeleteButton";
import { useUpdateMealRemoveDish } from "../../mutation/meal/PutMealRemoveDish";
import { useRouter } from "next/router";
import { useUpdateMealAddDishData } from "../../mutation/meal/PutMealAddDish";
import { useState } from "react";
import Modal from "../util/Modal";

const MealItem = ({ mealData, dishData }) => {
  const [showModal, setShowModal] = useState(false);
  // State for dish id
  const mealId = useRouter().query.id;

  const handleRemoveButtonClick = (dishId) => {
    updateMealRemoveDish({ mealId, dishId });
  };

  const { mutate: updateMealRemoveDish } = useUpdateMealRemoveDish();

  const handleAddButtonClick = (dishId) => {
    updateMealAddDish({ mealId, dishId });
  };

  const { mutate: updateMealAddDish } = useUpdateMealAddDishData();

  return (
    <>
      <div className="md:flex flex-cols">
        <div className="text-center">
          <h1 className="mt-4 mb-2 font-bold">{mealData?.data?.name}</h1>

          <div className="border rounded border-grey-300 bg-white overflow-hidden shadow-lg flex flex-col p-4">
            <Button onClick={() => setShowModal(true)} text={"Add dish"} />
            {dishData?.data.map((dish) =>
              mealData?.data?.dishesIds?.includes(dish.id) ? (
                <div
                  key={dish.id}
                  className="bg-white overflow-hidden shadow-lg mx-4 my-4 flex"
                >
                  <DeleteButton
                    text={"Remove"}
                    onClick={() => {
                      handleRemoveButtonClick(dish.id);
                    }}
                  />
                  <MealItemThumbnail dish={dish} />
                </div>
              ) : null
            )}
          </div>
        </div>
        <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
          <div>
            <h1 className="mt-4 font-bold">All dishes</h1>
            <h2 className="italic">
              That you can add too {mealData?.data?.name}
            </h2>

            {dishData?.data.map((dish) =>
              mealData?.data?.dishesIds?.includes(dish.id) ? null : (
                <div
                  key={dish.id}
                  className="bg-white overflow-hidden shadow-lg mx-4 my-4 flex"
                >
                  <Button
                    text={"Add"}
                    onClick={() => {
                      handleAddButtonClick(dish.id);
                    }}
                  />
                  <MealItemThumbnail dish={dish} />
                </div>
              )
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MealItem;
