import {useEffect, useState} from "react";
import {getBoeken, getBoekenByFilter} from "../services/BoekenService.ts";
import {addToLeesLijst} from "../services/LeesLijstService.ts";
import type {Boek} from "../types/boeken.ts";

export function useDiscoveryPage() {
    const [boeken, setBoeken] = useState<Boek[]>([]);
    const [loading, setLoading] = useState(true);
    const [zoekTerm, setZoekTerm] = useState("");
    const emptyBoekList: Boek[] = []

    useEffect(() => {
        async function loadBoeken() {
            try{
                const data: Boek[] = await getBoeken() ?? emptyBoekList;
                setBoeken(data)
            }catch(error){
                console.log(error);
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
            const data: Boek[] = await getBoekenByFilter(zoekTerm) ?? emptyBoekList;
            setBoeken(data)
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }


    return {boeken, loading, zoekTerm, setZoekTerm, handleSubmit, addToLeesLijst}
}