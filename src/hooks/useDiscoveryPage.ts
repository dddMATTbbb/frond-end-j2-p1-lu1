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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 20;

    useEffect(() => {
        let isCancelled = false;

        async function loadBoeken() {
            setLoading(true);
            try{
                const data = await getBoekenByFilter(boekFilter, page, limit);
                if (!isCancelled) {
                    setBoeken(data.boeken);
                    setTotalPages(data.totalPages);
                    setTotal(data.total);
                    if(!data.boeken){
                        setUnableToLoadBoeken(true);
                    }
                }
            }catch(error){
                console.log(error);
                if (!isCancelled) {
                    setUnableToLoadBoeken(true);
                }
            }finally{
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }
        loadBoeken();

        return () => {
            isCancelled = true;
        };
    }, [boekFilter, page])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setBoekFilter((prev) => ({...prev, [name]: value}));
        setPage(1);
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (page !== 1) {
            setPage(1);
        } else {
            setLoading(true);
            try{
                const data = await getBoekenByFilter(boekFilter, 1, limit)
                setBoeken(data.boeken ?? [])
                setTotalPages(data.totalPages)
                setTotal(data.total)
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
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


    return {
        boeken,
        loading,
        boekFilter,
        unableToLoadBoeken,
        page,
        totalPages,
        total,
        handlePageChange,
        handleChange,
        handleSubmit,
        addToLeesLijst,
        updateReadStatus
    }
}