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

export const updateStatusBoeken = async (boekId:string, isRead?:boolean) => {
    isRead = !isRead;
    try{
        const response = await fetch(`http://localhost:3000/leesLijst/status`, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                boekId: boekId,
                isRead: isRead,
            })
        })

        const data:Boek[] = await response.json()
        return data
    }catch(error){
        console.log(error);
    }
}