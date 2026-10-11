import type {LeesProfiel} from "../types/leesProfiel.ts";

export const submitForm = async (leesProfiel: LeesProfiel) => {
    try{
       const response =  await fetch( "http://localhost:3000/leesProfiel", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(leesProfiel)
        });

       return await response.json();
    } catch( err){
        return err;
    }
}

export const getForm = async () => {
        return await fetch( "http://localhost:3000/leesProfiel", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        });
}