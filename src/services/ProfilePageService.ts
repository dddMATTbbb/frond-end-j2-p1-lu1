import type {LeesProfiel} from "../types/leesProfiel.ts";

export const getUserLeesprofielData = async () => {
    try{
        const response =  await fetch('http://localhost:3000/leesProfiel', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        const result = (await response.json()) as { data: LeesProfiel | undefined };
        return result.data;
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

export const addDocentToStudent = async (docentEmail: string) => {
    try{
        const response = await fetch('http://localhost:3000/addDocent?' + new URLSearchParams({
            docentMail: docentEmail,
        }).toString(),{
            method: 'POST',
            credentials: 'include',
        })
        return await response.json()
    }catch(error){
        console.log(error);
        return error;
    }
}