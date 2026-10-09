import {useEffect, useState} from "react";
import type {Boek} from "../types/boeken.ts";
import {getBoek} from "../services/BoekenService.ts";
import {useNavigate} from "react-router-dom";

export function UseBoekPage(studentId: string | undefined) {
    const [loading, setLoading] = useState<boolean>(true);
    const [boek, setBoek] = useState<Boek | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        async function getBoekData() {
            try{
                if(!studentId) {
                    return;
                }
                const data:Boek | undefined = await getBoek(studentId);
                setBoek(data);
                console.log(boek);
            }catch(err){
                console.log(err);
            }finally {
                setLoading(false);
            }
        }

        getBoekData()
    }, [])

    const handleBackButtonClick = () => {
        navigate(-1);
    }

    return {loading, boek, handleBackButtonClick};
}