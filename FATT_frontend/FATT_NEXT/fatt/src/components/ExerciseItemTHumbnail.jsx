
const ExerciseItemTHumbnail = ({exercise}) => {
  return (
    <div>
        <h1> {exercise.name}</h1>
        <h2> {exercise.category}</h2>
        <img src={exercise.picturePath} width={200} height={200} />
    </div>
  )
}

export default ExerciseItemTHumbnail