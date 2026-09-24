import {useState} from "react";
import {submitForm} from "../services/LeesProfielQuestionFormService.ts";
import type {LeesProfiel} from "../types/leesProfiel.ts";

export function useLeesprofielQuestForm(){
    const [leeftijd, setLeeftijd] = useState<number>(0);
    const [gender, setGender] = useState<string>('');
    const [leesniveau, setLeesNiveau] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        const leesProfiel: LeesProfiel = {leeftijd, gender, leesniveau, genre}

        const response  = await submitForm(leesProfiel);
        if (response.ok) {
            setIsSubmitSuccess(true);
        }
    }

    return {
        setLeeftijd,
        setGender,
        setLeesNiveau,
        setGenre,
        handleSubmit,
        isSubmitSuccess,
        setIsSubmitSuccess,
    }
}

