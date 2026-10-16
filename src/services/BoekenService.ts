import type {Boek} from "../types/boeken.ts";
import type {boekFilter} from "../types/boekFilter.ts";

export const getBoekenByFilter = async (boekFilter: boekFilter):Promise<Boek[]> => {
    try{
        const params = new URLSearchParams();
        params.append('zoekTerm', boekFilter.zoekTerm);
        if (boekFilter.taalNiveau !== null) params.append('taalNiveau', boekFilter.taalNiveau);
        if (boekFilter.onderwerp !== null) params.append('onderwerp', boekFilter.onderwerp);
        if (boekFilter.genre !== null) params.append('genre', boekFilter.genre);

        const response = await fetch(`http://localhost:3000/boeken?${params.toString()}`, {
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
        return [];
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

export const getForYouBoeken = async ()=> {
    try{
        const response = await fetch(`http://localhost:3000/getVoorJou`, {
            method: 'GET',
            credentials: 'include',
        })

        if(!response.ok){
            const error = await response.json()
            throw new Error('getBoekenStudent Error' + error.message);
        }

        const data:Boek[] = await response.json()
        return data
    } catch (error){
        console.log(error)
    }
}

export const getBoek = async (boekId:string) => {
    try{
        const response = await fetch(`http://localhost:3000/boek?boekId=${encodeURIComponent(boekId)}`, {
            method: 'GET',
        })

        if (!response.ok) {
            console.error(` get boek request mislukt: ${response.status}`);
            return undefined;
        }

        const data:Boek = await response.json()
        return data
    }catch(error){
        console.log(error);
        return undefined;
    }
}