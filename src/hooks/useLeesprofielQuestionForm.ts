import {useState} from "react";
import {submitForm} from "../services/LeesProfielQuestionFormService.ts";
import type {LeesProfiel} from "../types/leesProfiel.ts";
import {usePersistedState} from "./usePersistendState.ts";

const emptyLeesprofielFormData: LeesProfiel = {leeftijd: undefined, gender: "", leesniveau: "", genre: ""};

export function useLeesprofielQuestForm(){
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
    const [form, setForm] = usePersistedState<LeesProfiel>("leesprofiel-form", emptyLeesprofielFormData);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    )=> {
        const {name, value} = event.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault();

        console.log(form);

        const response  = await submitForm(form);
        if (response.ok) {
            setIsSubmitSuccess(true);
            sessionStorage.removeItem("leesprofiel-form");
            setForm(emptyLeesprofielFormData);
        }
    }

    return {
        handleSubmit,
        handleChange,
        isSubmitSuccess,
        setIsSubmitSuccess,
        form
    }
}

