import {useEffect, useState} from "react";
import {getBoekenByFilter, updateStatusBoeken} from "../services/BoekenService.ts";
import {addToLeesLijst as addToLeesLijstApi} from "../services/LeesLijstService.ts";
import type {Boek} from "../types/boeken.ts";
import type {boekFilter} from "../types/boekFilter.ts";

export function useDiscoveryPage() {
    const leegBoekFilter: boekFilter = {
        zoekTerm: '',
        taalNiveau: null,
        genre: null,
        onderwerp: null,
    }

    const [boeken, setBoeken] = useState<Boek[]>([]);
    const [loading, setLoading] = useState(true);
    const [boekFilter, setBoekFilter] = useState<boekFilter>(leegBoekFilter);
    const [unableToLoadBoeken, setUnableToLoadBoeken] = useState(false);

    useEffect(() => {
        async function loadBoeken() {
            try{
                const data: Boek[] = await getBoekenByFilter(boekFilter);
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setBoekFilter((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true);

        try{
            const data: Boek[] = await getBoekenByFilter(boekFilter)
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


    return {boeken, loading, boekFilter, unableToLoadBoeken, handleChange, handleSubmit, addToLeesLijst, updateReadStatus}
}