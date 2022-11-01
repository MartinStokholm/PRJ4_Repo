import {useState, useEffect} from "react";
import axios from "axios";

const FetchExerciseNormal = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const urlstring = "https://localhost:4000/exercise";

    useEffect(() =>  {
        axios.get("http://localhost:4000/exercise").then((res) => {
            setData(res.data)
            setIsLoading(false)
        }).catch(error => {
            setError(error.message)
            setIsLoading(false)
        })

    }, [] )

    if (isLoading) {
        return <h2>Loading...</h2>
    }
    
    if( error ) {
        return <h2>Error: {error}</h2>
    }
  return (
    <>
        <h2>Exercise</h2>
        {data.map((exercises) => {
            return <div key={exercises.Name}>{exercises.Name}</div>
        })}

    </>
  )
}

export default FetchExerciseNormal