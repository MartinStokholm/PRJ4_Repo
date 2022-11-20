import ExerciseItemThumbnail from "./ExerciseItemThumbnail";
import Select from "react-select";
import { TextInput } from "flowbite-react";
import InputButton from "../Button/InputButton";
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
        <form clasName="flex">
          <TextInput
            type="text"
            placeholder="newExerciseName"
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Category"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Intensity"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Equipment"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Repetitions"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Sets"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="PicturePath"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="VideoPath"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <InputButton type={"submit"} text={"Create"} key={undefined} />
        </form>
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
