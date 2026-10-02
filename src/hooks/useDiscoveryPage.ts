import {useEffect, useState} from "react";
import {getBoeken} from "../services/BoekenService.ts";
import type {Boek} from "../types/boeken.ts";

export function useDiscoveryPage() {
    const [boeken, setBoeken] = useState<Boek[]>([]);
    const [loading, setLoading] = useState(true);
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


    return {boeken, loading}
}