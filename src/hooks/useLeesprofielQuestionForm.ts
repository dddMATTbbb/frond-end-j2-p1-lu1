import {useState} from "react";
import {submitForm} from "../services/LeesProfielQuestionFormService.ts";
import type {LeesProfiel} from "../types/leesProfiel.ts";
import {useNavigate} from "react-router-dom";

export function useLeesprofielQuestForm(){
    const navigate = useNavigate();
    const [leeftijd, setLeeftijd] = useState<number>(0);
    const [gender, setGender] = useState<string>('');
    const [leesniveau, setLeesNiveau] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean | undefined>(undefined);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        const leesProfiel: LeesProfiel = {leeftijd, gender, leesniveau, genre}

        const response  = await submitForm(leesProfiel);
        if (response.ok) {
            setIsSubmitSuccess(true);
            navigate("/VoorJou");
        }
    }

    return {
        setLeeftijd,
        setGender,
        setLeesNiveau,
        setGenre,
        handleSubmit,
        isSubmitSuccess,
    }
}

