import {useEffect, useState} from "react";
import type {Boek} from "../types/boeken.ts";
import {getLeesLijst} from "../services/LeesLijstService.ts";

export function useReadListPage() {
    const [leesLijst, setLeesLijst] = useState<Boek[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const emptyLeesLijst: Boek[] = []

    useEffect(() => {
        async function fetchLeesLijst() {
            try{
                const data:Boek[] = await getLeesLijst() ?? emptyLeesLijst
                setLeesLijst(data)
            }catch(error){
                console.error(error)
            }finally {
                setLoading(false)
            }
        }

        fetchLeesLijst()
    }, [])

    return {leesLijst, loading}
}