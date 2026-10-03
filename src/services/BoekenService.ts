import type {Boek} from "../types/boeken.ts";

export const getBoeken = async () => {
    try{
        const response = await fetch('http://localhost:3000/boeken', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error(`Request mislukt: ${response.status}`);
        }
        const data:Boek[] = await response.json()
        return data
    }catch(error){
        console.log(error);
    }
}

export const getBoekenByFilter = async (zoekTerm: string) => {
    try{
        const response = await fetch('http://localhost:3000/boeken?' + new URLSearchParams({
            zoekTerm: zoekTerm,
        }).toString(), {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error(`Request mislukt: ${response.status}`);
        }
        const data:Boek[] = await response.json()
        return data
    }catch(error){
        console.log(error);
    }
}