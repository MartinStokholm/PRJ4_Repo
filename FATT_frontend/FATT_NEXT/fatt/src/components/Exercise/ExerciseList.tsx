import ExerciseItemThumbnail from "./ExerciseItemThumbnail";
import Select from "react-select";
import { TextInput } from "flowbite-react";
import InputButton from "../Button/InputButton";
import { usePostExercise } from "../../mutation/exercise/PostExercise";
import { ExerciseNoIdDto } from "../../../interfaces/Exercise";
import { useState } from "react";

const ExerciseList = ({ data }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [category, setCategory] = useState("");
  const [Equipment, setEquipment] = useState("");
  const [Intensity, setIntensity] = useState("");
  const [Repetitions, setRepetitions] = useState("");
  const [Sets, setSets] = useState("");
  const [PicturePath, setPicturePath] = useState("");
  const [VideoPath, setVideoPath] = useState("");

  const handleCreateButtonClick = () => {
    const exerciseNoIdDto: ExerciseNoIdDto = {
      Name: exerciseName,
      Category: category,
      Intensity: Intensity,
      Equipment: Equipment,
      Repetitions: Repetitions,
      Sets: Sets,
      PicturePath: PicturePath,
      VideoPath: VideoPath,
    };
    exercise(exerciseNoIdDto);
  };

  const { mutate: exercise } = usePostExercise();
  return (
    <>
      <div>
        <h1 className="mb-2 font-bold">Create an exercise</h1>
        <form
          onSubmit={handleCreateButtonClick}
          className="flex flex-wrap border rounded bg-grey-200"
        >
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="Name"
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="Intensity"
            onChange={(e) => setIntensity(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="Equipment"
            onChange={(e) => setEquipment(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="Repetitions"
            onChange={(e) => setRepetitions(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="Sets"
            onChange={(e) => setSets(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="PicturePath"
            onChange={(e) => setPicturePath(e.target.value)}
          />
          <TextInput
            type="text"
            className="mx-auto my-4 md:mx-4"
            placeholder="VideoPath"
            onChange={(e) => setVideoPath(e.target.value)}
          />
          <InputButton type={"submit"} text={"Create"} key={undefined} />
        </form>

        <div className="border rounded p-4 mt-4">
          <Select
            getOptionLabel={(option) => `${(option as any).category}`}
            options={data?.data?.category}
            instanceId="category"
            isMulti
            placeholder="Filter by category"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {data?.data?.map((exercise) => {
          return (
            <div
              key={exercise.id}
              className="w-1/2 md:w-1/4 mb-4 mt-4 px-4 md:px-8"
            >
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
