import type {LeesProfiel} from "../types/leesProfiel.ts";

export const submitForm = async (leesProfiel: LeesProfiel) => {
    try{
        const response = await fetch( "http://localhost:3000/leesProfiel", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(leesProfiel)
        });
        console.log("response: " + response);
        return response;
    } catch(err){
        console.log(err);
        throw err;
    }
}