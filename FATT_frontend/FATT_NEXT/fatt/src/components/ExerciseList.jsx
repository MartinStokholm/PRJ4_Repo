
import Link from "next/link";
import styles from '../../styles/Exercise.module.css'
import ExerciseItemThumbnail from './ExerciseItemTHumbnail';
const ExerciseList = ({ data }) => {
  return (
    <> 
      {data?.data.map((exercise) => {
          return <div key={exercise.id} className={styles.listItem}> { 
              <Link 
                  href={{pathname:`/exercise/${exercise.id}`}} 
                  key={exercise.id}>
                  <ExerciseItemThumbnail exercise={exercise} />
              </Link> 
          }
          </div>;
      })}
    </>
  )
}

export default ExerciseList