import {useEffect, useState} from "react";
import type {Boek} from "../types/boeken.ts";
import {getBoek} from "../services/BoekenService.ts";
import {useNavigate} from "react-router-dom";

export function useBoekPage(boekId: string | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [boek, setBoek] = useState<Boek | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!boekId) return;

        let cancelled = false;

        async function getBoekData(id: string) {
            setLoading(true);
            try {
                const data = await getBoek(id);
                if (!cancelled) setBoek(data);
            } catch (err) {
                console.log(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        getBoekData(boekId);

        return () => {
            cancelled = true;
        };
    }, [boekId]);

    const handleBackButtonClick = () => {
        navigate(-1);
    }

    return {loading, boek, handleBackButtonClick};
}