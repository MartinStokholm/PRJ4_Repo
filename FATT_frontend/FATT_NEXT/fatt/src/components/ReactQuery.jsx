import {QueryClient, useQuery} from "react-query";
import axios from "axios";
import { useEffect } from "react";
import { fetchWorkouts } from "../fetchers/workout"
// import { Account } from "../../interfaces/Account";

export  function ReactQuery(){
    console.log("Render");

    const {isError, isSuccess, isLoading, data, error} = useQuery(
        'exercisesKey',  
        fetchWorkouts, 
        {
            staleTime: 60000
        }
    );

    useEffect(() => {
        console.log("Component mounted");
    }, []);
    
    if (isLoading) {
        return <h2>Loading...</h2>;
      }
    
      if (isError) {
        return <h2>{error.message}</h2>;
      }
    
      return (
        <div>
          <h2>Exercises</h2>
          {data?.data.map((exercise) => {
            return <div key={exercise.name}>{exercise.name} </div>;
          })}
        </div>
      );
}
// {data?.data && data?.data.map((workout) =>  <workout key={workout.id} workout={workout} />) }