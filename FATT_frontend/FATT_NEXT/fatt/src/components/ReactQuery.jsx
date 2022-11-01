import {QueryClient, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { fetchWorkouts } from "../fetchers/workout"
// import { Account } from "../../interfaces/Account";

export function ReactQuery(){
    console.log("Render");

    const {isError, isSuccess, isLoading, data, error} = useQuery(
        ["workout"], 
        fetchWorkouts, 
        {staleTime: 60000}
    );

    useEffect(() => {
        console.log("Component mounted");
    }, []);
    
    if (isLoading) {
        console.log("Loading");
        return <div>Loading...</div>;
    }
    
    if (isError) {
        console.log("Error; ", error);
        return <div>Error</div>;
    }

    return (
        <div>
            {data && data.map((workout) =>  <Account key={workout.id} workout={workout} />) }
        </div>
    )
}