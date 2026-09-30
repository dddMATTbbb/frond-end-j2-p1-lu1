import type {LeesProfiel} from "../types/leesProfiel.ts";

export const getUserLeesprofielData = async () => {
    try{
        return await fetch('http://localhost:3000/leesProfiel', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
    }catch(error){
        console.log(error);
    }
}

export const updateLeesprofielData = async (leesprofiel: LeesProfiel) => {
    return await fetch('http://localhost:3000/leesProfiel', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(leesprofiel)
    })
}