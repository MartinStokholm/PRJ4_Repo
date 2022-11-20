import ExerciseItemThumbnail from "./ExerciseItemThumbnail";
import Select from "react-select";
import { TextInput } from "flowbite-react";
import InputButton from "../Button/InputButton";
const ExerciseList = ({ data }) => {
  return (
    <>
      <div>
        <div className="border rounded p-4 mb-4">
          <Select
            getOptionLabel={(option) => `${option.category}`}
            options={data?.data?.category}
            instanceId="category"
            isMulti
            placeholder="Filter by category"
          />
        </div>

        <h1 className="mb-2 font-bold">Create an exercise</h1>
        <form className="flex flex-wrap border rounded bg-grey-200">
          <TextInput
            type="text"
            className="mx-auto my-4 "
            placeholder="Name"
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4"
            placeholder="Category"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4"
            placeholder="Intensity"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4"
            placeholder="Equipment"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4"
            placeholder="Repetitions"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4"
            placeholder="Sets"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4"
            placeholder="PicturePath"
            onChange={(e) => setDurantion(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4"
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
    </>
  );
};

export default ExerciseList;
