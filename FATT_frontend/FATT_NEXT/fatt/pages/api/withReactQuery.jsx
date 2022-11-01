import {QueryClient, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { fetchAccount } from "./account/account"
import { Account } from "../../interfaces/Account";

export function WithReactQuery(){
    console.log("Render");

    const {isError, isSuccess, isLoading, data, error} = useQuery(
        ["accounts"], 
        fetchAccount, 
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
            {data && data.map((account) =>  <Account key={account.id} account={account} />) }
        </div>
    )
}