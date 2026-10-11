import {useEffect, useState} from 'react'
import {getForYouBoeken, updateStatusBoeken} from "../services/BoekenService.ts";
import type {Boek} from "../types/boeken.ts";
import {addToLeesLijst as addToLeesLijstApi} from "../services/LeesLijstService.ts";

const emptyBoekList: Boek[] = [];

export default function useForYou() {
    const [loading, setLoading] = useState(true)
    const [boeken, setBoeken] = useState<Boek[]>([])

    useEffect(() => {
        const loadBoeken = async () => {
            try{
                setLoading(true)
                const data: Boek[] = await getForYouBoeken() ?? emptyBoekList;
                console.log(data)
                setBoeken(data)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        loadBoeken()
    }, [])

    const addToLeesLijst = async (boekId: string, isBookmarked: boolean) => {
        try{
            console.log(boekId, isBookmarked)
            await addToLeesLijstApi(boekId, isBookmarked);
            setBoeken(prev =>
                prev.map(boek =>
                    boek.id === boekId
                        ? {...boek, isBookmarked: !isBookmarked}
                        : boek
                )
            );
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    const updateReadStatus = async (boekId: string, isRead?: boolean) => {
        try{
            await updateStatusBoeken(boekId, isRead);
            setBoeken(prev =>
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

    return {boeken, loading, addToLeesLijst, updateReadStatus}
}