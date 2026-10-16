import type {Boek, PaginatedBoeken} from "../types/boeken.ts";
import type {boekFilter} from "../types/boekFilter.ts";

export const getBoekenByFilter = async (
    boekFilter: boekFilter,
    page: number = 1,
    limit: number = 20
): Promise<PaginatedBoeken> => {
    try{
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (boekFilter.zoekTerm) params.append('zoekTerm', boekFilter.zoekTerm);
        if (boekFilter.taalNiveau !== null && boekFilter.taalNiveau !== undefined) params.append('taalNiveau', boekFilter.taalNiveau);
        if (boekFilter.onderwerp !== null && boekFilter.onderwerp !== undefined) params.append('onderwerp', boekFilter.onderwerp);
        if (boekFilter.genre !== null && boekFilter.genre !== undefined) params.append('genre', boekFilter.genre);

        const response = await fetch(`http://localhost:3000/boeken?${params.toString()}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error(`Request mislukt: ${response.status}`);
        }
        const data = await response.json()
        if (Array.isArray(data)) {
            return {
                boeken: data,
                total: data.length,
                page,
                limit,
                totalPages: Math.ceil(data.length / limit) || 1,
            };
        }
        return {
            boeken: data.boeken ?? [],
            total: typeof data.total === 'number' ? data.total : (data.boeken?.length ?? 0),
            page: typeof data.page === 'number' ? data.page : page,
            limit: typeof data.limit === 'number' ? data.limit : limit,
            totalPages: typeof data.totalPages === 'number' ? data.totalPages : (Math.ceil((data.total ?? 0) / limit) || 1),
        };
    }catch(error){
        console.log(error);
        return {
            boeken: [],
            total: 0,
            page,
            limit,
            totalPages: 1,
        };
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