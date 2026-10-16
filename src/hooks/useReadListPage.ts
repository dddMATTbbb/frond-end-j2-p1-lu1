import {useEffect, useState} from "react";
import type {Boek} from "../types/boeken.ts";
import {getLeesLijst, addToLeesLijst as addToLeesLijstApi} from "../services/LeesLijstService.ts";
import {updateStatusBoeken} from "../services/BoekenService.ts";

export function useReadListPage() {
    const [leesLijst, setLeesLijst] = useState<Boek[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const limit = 20;

    useEffect(() => {
        let isCancelled = false;

        async function fetchLeesLijst() {
            setLoading(true);
            try{
                const data = await getLeesLijst(page, limit);
                if (!isCancelled) {
                    setLeesLijst(data.boeken);
                    setTotalPages(data.totalPages);
                    setTotal(data.total);
                }
            }catch(error){
                console.error(error);
            }finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        }

        fetchLeesLijst();

        return () => {
            isCancelled = true;
        };
    }, [page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const addToLeesLijst = async (boekId: string, isBookmarked:boolean) => {
        try{
            await addToLeesLijstApi(boekId, isBookmarked);
            if (leesLijst.length === 1 && page > 1) {
                setPage(prev => prev - 1);
            } else {
                const data = await getLeesLijst(page, limit);
                setLeesLijst(data.boeken);
                setTotalPages(data.totalPages);
                setTotal(data.total);
            }
        }catch(error){
            console.error(error);
        }
    };

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
    };

    return {
        leesLijst,
        loading,
        page,
        totalPages,
        total,
        handlePageChange,
        addToLeesLijst,
        updateReadStatus
    };
}