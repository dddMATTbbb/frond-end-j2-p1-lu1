import {getUserLeesprofielData} from "../services/ProfilePageService.ts";
import {useState} from "react";
import type {LeesProfiel} from "../types/leesProfiel.ts";

export const getProfileData = async () => {
    const response = await getUserLeesprofielData();
    const emptyForm:LeesProfiel = {leeftijd: 16, gender: '', genre: '', leesniveau: ''}
    const [form, setForm] = useState<LeesProfiel>(emptyForm);

    if(response === undefined) {
        const emptyLeesProfiel: LeesProfiel = {leeftijd: 16, gender: '', genre: '', leesniveau: ''}
        return emptyLeesProfiel as LeesProfiel;
    } else {
        const data = await response.json() as LeesProfiel;
        setForm(data);
    }
}