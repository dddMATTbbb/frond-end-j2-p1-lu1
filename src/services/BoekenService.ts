import type {Boek} from "../types/boeken.ts";

export const getBoeken = async () => {
    try{
        const response = await fetch('http://localhost:3000/boeken', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        console.log(response)
        const data:Boek[] = await response.json()
        return data
    }catch(error){
        console.log(error);
    }
}