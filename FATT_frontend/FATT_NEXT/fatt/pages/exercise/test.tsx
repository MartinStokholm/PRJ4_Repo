// import { useMutation } from "react-query";

// import { useState } from "react";
// import Button from "../../src/components/Button";
// import getExercisesList from "../../src/queries/Exercises";

// const onSuccess = () => {
//   {
//     /* Maybe we only should show data if success*/
//   }

//   console.log("Perform side effect after data fetching");
// };

// const onError = (error) => {
//   console.log(`Perform side effect after encountered error\n ${error}`);
// };

// export default function TestPage() {
//   const { data: ExerciseData } = getExercisesList();

//   const [ExerciseId, setExerciseId] = useState();
//   const [name, setName] = useState("");
//   const [duration, setDuration] = useState("");
//   const [exercisesIds, setExerciseIds] = useState("");
//   const [exerciseId, setExerciseId] = useState();
//   // I Get server error if we don't give id, maybe it works on real server without
//   //const id = "44";
//   const { mutate: addExercise } = useAddExerciseData();
//   const { mutate: updateExercise } = useUpdateExerciseData();
//   const { mutate: deleteExercise } = useDeleteExerciseData();
//   const { mutate: addExercisesToExercise } = useAddExercisesToExerciseData();
//   const { mutate: updateExerciseAddExercise } =
//     useUpdateExerciseAddExerciseData();

//   const handleAddExerciseClick = () => {
//     console.log({ name, duration, exercisesIds });

//     const Exercise = { name, duration, exercisesIds };
//     addExercise(Exercise);
//   };

//   const handleUpdateExerciseClick = () => {
//     console.log({ ExerciseId, name, duration, exercisesIds });

//     const Exercise = { ExerciseId, name, duration, exercisesIds };
//     updateExercise(Exercise);
//   };

//   // Need to make a array builder, because the data that is tranfered over
//   // is a list of numbers
//   const handleaddExercisesToExerciseClick = () => {
//     console.log({ ExerciseId, exercisesIds });

//     const Exercise = { ExerciseId, exercisesIds };
//     addExercisesToExercise(Exercise);
//   };

//   const handleUpdateExerciseAddExerciseClick = () => {
//     console.log({ ExerciseId, exerciseId });

//     const Exercise = { ExerciseId, exerciseId };
//     updateExerciseAddExercise(Exercise);
//   };

//   const handleDeleteExerciseClick = () => {
//     console.log({ ExerciseId, name, duration, exercisesIds });

//     const Exercise = { ExerciseId, name, duration, exercisesIds };
//     deleteExercise(Exercise);
//   };

//   return (
//     <>
//       <input
//         type="text"
//         placeholder="ExerciseId"
//         value={ExerciseId}
//         onChange={(e) => setExerciseId(e.target.value)}
//       />
//       <input
//         type="text"
//         value={name}
//         placeholder="name"
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         value={duration}
//         placeholder="duration"
//         onChange={(e) => setDuration(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="exercisesIds"
//         value={exercisesIds}
//         onChange={(e) => setExerciseIds(e.target.value)}
//       />
//       <input
//         type="text"
//         value={exerciseId}
//         placeholder="exerciseId"
//         onChange={(e) => setExerciseId(e.target.value)}
//       />
//       <Button onClick={handleAddExerciseClick} text={"Add"} key={undefined} />
//       <Button
//         onClick={handleUpdateExerciseClick}
//         text={"Update"}
//         key={undefined}
//       />
//       <Button
//         onClick={handleDeleteExerciseClick}
//         text={"Delete"}
//         key={undefined}
//       />
//       <Button
//         onClick={handleaddExercisesToExerciseClick}
//         text={"Add Exercises To Exercise"}
//         key={undefined}
//       />
//       <Button
//         onClick={handleUpdateExerciseAddExerciseClick}
//         text={"Add Exercise To Exercise"}
//         key={undefined}
//       />
//       <div></div>
//     </>
//   );
// }
