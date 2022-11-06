
import Link from "next/link";
import styles from '../../styles/ExerciseList.module.css'
import ExerciseItemThumbnail from './ExerciseItemTHumbnail';
const ExerciseList = ({ data }) => {
  return (
    
    <div className={styles.list}>
        
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
    </div>
  )
}

export default ExerciseList