import styles from '../../styles/ExerciseList.module.css'
import Image from 'next/image'
import Youtube from 'react-youtube';

const ExerciseItem = ({exercise}) => {
  
  const videoUrl = exercise?.data?.videoPath;
  const videoId = videoUrl?.split('be/')[1];
  return (

    <div className={styles.itemWrapper}>
      <div className={styles.item}>
        <h1> {exercise?.data.name}</h1>
        <h2>Category: {exercise?.data.category}</h2>
        <h3>Intenisty: {exercise?.data.intensity}</h3>
        <img src={exercise?.data.picturePath}/>
        <p>Equipment: {exercise?.data.equipment}</p>
        <p>Repetities: {exercise?.data.repetitions}</p>
        <p>Sets: {exercise?.data.sets}</p>
        <p>Video showing how to perform {exercise?.data.name}</p>
        <Youtube  
            videoId= {videoId} 
            className={styles.video} 
        />
      </div>
    </div>
  )
}

export default ExerciseItem