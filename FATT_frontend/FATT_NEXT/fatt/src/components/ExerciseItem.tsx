import styles from '../../styles/Layout.module.css'
import Image from 'next/image'
import Youtube from 'react-youtube';

const ExerciseItem = ({exercise}) => {
  
  const options = {
    height: '100%',
    width: '100%',
  };

  const videoUrl = exercise?.data?.videoPath;
  const videoId = videoUrl?.split('be/')[1];
  return (

    <div className={styles.card}>
        <h1> {exercise?.data.name}</h1>
        <h2>Category: {exercise?.data.category}</h2>
        <h3>Intenisty: {exercise?.data.intensity}</h3>
        <p>Equipment: {exercise?.data.equipment}</p>
        <p>Repetities: {exercise?.data.repetitions}</p>
        <p>Sets: {exercise?.data.sets}</p>
        <p>Video showing how to perform {exercise?.data.name}</p>
        <Youtube  
            opts={options} 
            videoId= {videoId} 
            className={styles.video} 
        />
    </div>
  )
}

export default ExerciseItem