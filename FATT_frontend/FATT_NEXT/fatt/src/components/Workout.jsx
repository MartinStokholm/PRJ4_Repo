import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function Workout({props}) {
    // Defualt account item 
    const {workout} = props;
    const {
        name,
        weigth,
        gender,
        age,
        email
    } = workout;
    const urlstring = "http://localhost:7257";
    const requestType = "/api/account";
    const QueryClient = useQueryClient();

    // //Mutation (Add Exercise to Workout)
    // const workoutMutation = useMutation(
    //     (addExercise) => {
    //         console.log("Run:", addExercise);
    //         return axios.put(`${urlstring}${requestType}`)
    //     }
    // )
}