<<<<<<< Updated upstream:FATT_frontend/FATT_NEXT/fatt/src/components/Exercise/ExerciseList.jsx
import ExerciseItemThumbnail from "./ExerciseItemTHumbnail";

=======
import ExerciseItemThumbnail from "./ExerciseItemThumbnail";
import Select from "react-select";
>>>>>>> Stashed changes:FATT_frontend/FATT_NEXT/fatt/src/components/ExerciseList.jsx
const ExerciseList = ({ data }) => {
  return (
    <div>
      <div className="border rounded mb-4">
        <Select
          getOptionLabel={(option) => `${option.category}`}
          options={data?.data?.category}
          instanceId="category"
          isMulti
          placeholder="Filter by category"
        />
      </div>
      <div className="flex flex-wrap">
        {data?.data?.map((exercise) => {
          return (
            <div key={exercise.id} className="w-1/2 md:w-1/4 mb-4 px-4 md:px-8">
              {" "}
              {<ExerciseItemThumbnail exercise={exercise} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseList;
