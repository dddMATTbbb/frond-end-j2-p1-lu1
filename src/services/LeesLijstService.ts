import type {Boek} from "../types/boeken.ts";

export const getLeesLijst = async () => {
    try{
        const response = await fetch("http://localhost:3000/leesLijst", {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data:Boek[] = await response.json()
        console.log(data)
        return data
    } catch (error){
        console.error(error)
    }
}