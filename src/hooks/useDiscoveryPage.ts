import {useEffect, useState} from "react";
import {getBoeken, getBoekenByFilter, updateStatusBoeken} from "../services/BoekenService.ts";
import {addToLeesLijst as addToLeesLijstApi} from "../services/LeesLijstService.ts";
import type {Boek} from "../types/boeken.ts";

export function useDiscoveryPage() {
    const [boeken, setBoeken] = useState<Boek[]>([]);
    const [loading, setLoading] = useState(true);
    const [zoekTerm, setZoekTerm] = useState("");
    const [unableToLoadBoeken, setUnableToLoadBoeken] = useState(false);

    useEffect(() => {
        async function loadBoeken() {
            try{
                const data: Boek[] = await getBoeken();
                setBoeken(data)
                if(!data){
                    setUnableToLoadBoeken(true);
                }
            }catch(error){
                console.log(error);
                setUnableToLoadBoeken(true);
            }finally{
                setLoading(false);
            }
        }
        loadBoeken();
    }, [])

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);

        try{
            const data: Boek[] = await getBoekenByFilter(zoekTerm)
            setBoeken(data ?? [])
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const addToLeesLijst = async (boekId: string, isBookmarked: boolean) => {
        try{
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


    return {boeken, loading, zoekTerm, unableToLoadBoeken, setZoekTerm, handleSubmit, addToLeesLijst, updateReadStatus}
}