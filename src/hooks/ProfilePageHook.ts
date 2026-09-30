import {getUserLeesprofielData, updateLeesprofielData} from "../services/ProfilePageService.ts";
import {useEffect, useState} from "react";
import type {LeesProfiel} from "../types/leesProfiel.ts";

const emptyLeesProfiel:LeesProfiel = {
    leeftijd: 16,
    gender: '',
    genre: '',
    leesniveau: ''
}

export const useProfileData = () => {
    const [form, setForm] = useState<LeesProfiel>(emptyLeesProfiel);
    const [loading, setLoading] = useState<boolean>(true);
    const [isChange, setIsChange] = useState(false);
    const [isUpdateLeesProfielSucces, setIsUpdateLeesProfielSucces] = useState<boolean | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const getProfileData = async () => {
            try{
                const response = await getUserLeesprofielData();
                if(response === undefined) {
                    console.log("no profile data");
                    setForm(emptyLeesProfiel)
                } else {
                    const json = await response.json() as { data: LeesProfiel | null };
                    setForm(json.data ?? emptyLeesProfiel);
                }
            }catch(err){
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getProfileData();
    }, []);

    const updateLeesProfiel = async (event: React.FormEvent<HTMLFormElement>):Promise<boolean> => {
        event.preventDefault();
        setSaving(true);
        setIsUpdateLeesProfielSucces(null)

        try{
            const response = await updateLeesprofielData(form);
            if(!response.ok) {
                setIsUpdateLeesProfielSucces(false);
                return false;
            } else {
                setIsUpdateLeesProfielSucces(true);
            }
            return true
        } catch(err){
            console.error(err);
            setIsUpdateLeesProfielSucces(false);
            return false;
        } finally {
            setSaving(false);
        }
    }

    return {form, setForm, loading, isChange, setIsChange, saving, isUpdateLeesProfielSucces, updateLeesProfiel};
}