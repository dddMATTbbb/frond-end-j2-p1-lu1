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