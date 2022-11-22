import WorkoutItemThumbnail from "./WorkoutItemThumbnail";
import Link from "next/link";
import DeleteButton from "../Button/DeleteButton";
import WorkoutModal from "./WorkoutModal";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Setting/Modal";

const WorkoutList = ({ workoutData, exerciseData }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <Button
          onClick={() => setShowModal(true)}
          text={"Create Workout"}
          key={undefined}
        />
      </div>

      <Modal IsVisible={showModal} onClose={() => setShowModal(false)}>
        <WorkoutModal />
      </Modal>

      <div className="flex flex-wrap justify-center">
        {/* This maps out all workouts with their exercise as names */}
        {workoutData.data?.map((workout) => (
          <div
            key={workout.name}
            className="rounded bg-white shadow-lg w-full md:w-1/3 m-4 flex flex-col justify-center"
          >
            <div className="flex flex-col justify-center">
              <Link
                href={{ pathname: `/workout/${workout.id}` }}
                key={workout.id}
                className="hover:bg-green-50 hover:shadow-inner flex justify-center"
              >
                <h1 className="m-2 font-bold py-1">{workout.name}</h1>

                <h2 className="m-2 italic py-1">{workout.duration}</h2>
              </Link>
            </div>
            <div>
              {exerciseData?.data.map((exercise) =>
                workout?.exercisesIds?.includes(exercise.id) ? (
                  <div
                    key={exercise.id}
                    className="bg-white overflow-hidden shadow-lg mx-4 my-4"
                  >
                    <WorkoutItemThumbnail exercise={exercise} />
                  </div>
                ) : null
              )}
            </div>
            <DeleteButton
              text={"Delete"}
              onClick={() => {
                handleDeleteButtonClick(workout.id);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkoutList;
