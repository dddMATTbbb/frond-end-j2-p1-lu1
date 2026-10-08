import {useEffect, useState} from "react";
import type {Boek} from "../types/boeken.ts";
import {getLeesLijst, addToLeesLijst as addToLeesLijstApi} from "../services/LeesLijstService.ts";
import {updateStatusBoeken} from "../services/BoekenService.ts";

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

    const addToLeesLijst = async (boekId: string, isBookmarked:boolean) => {
        try{
            await addToLeesLijstApi(boekId, isBookmarked);
            setLeesLijst(prev => prev.filter(boek => boek.id !== boekId))
        }catch(error){
            console.error(error)
        }
    }

    const updateReadStatus = async (boekId: string, isRead?: boolean) => {
        try{
            await updateStatusBoeken(boekId, isRead);
            setLeesLijst(prev =>
                prev.map(boek =>
                    boek.id === boekId
                        ? {...boek, isRead: !isRead}
                        : boek
                )
            );
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    return {leesLijst, loading, addToLeesLijst, updateReadStatus}
}