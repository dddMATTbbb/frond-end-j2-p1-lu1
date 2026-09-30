import type {LeesProfiel} from "../types/leesProfiel.ts";

export const submitForm = async (leesProfiel: LeesProfiel) => {
    try{
       return await fetch( "http://localhost:3000/leesProfiel", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(leesProfiel)
        });
    } catch(err){
        throw err;
    }
}

export const getForm = async () => {
    try{
        return await fetch( "http://localhost:3000/leesProfiel", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        });
    }catch(err){
        throw err;
    }
}