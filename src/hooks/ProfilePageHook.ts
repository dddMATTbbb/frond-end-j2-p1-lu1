import { useEffect, useState } from "react";
import { getUserLeesprofielData, updateLeesprofielData, addDocentToStudent } from "../services/ProfilePageService";
import { useModal } from "./useModal";
import type { LeesProfiel } from "../types/leesProfiel";

const leegProfiel: LeesProfiel = {
    leeftijd: 0,
    gender: "",
    favorieteTypeMatariaal: "",
    leesniveau: "",
};

export function useProfilePage() {
    const [profiel, setProfiel] = useState<LeesProfiel>(leegProfiel);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { modal, showModal, closeModal } = useModal();
    const [docentEmail, setDocentEmail] = useState("");

    // data laden bij openen van de pagina
    useEffect(() => {
        async function load() {
            try {
                const data = await getUserLeesprofielData();
                setProfiel(data ?? leegProfiel);
                console.log(profiel)
            } catch {
                showModal("Er ging iets mis", "Je profiel kon niet worden geladen.", "error");
            } finally {
                setLoading(false);
            }
        }
        load();
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=> {
        const {name, value} = event.target;
        setProfiel((prev) => ({...prev, [name]: value}));
    }

    const handleChangeDocentForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        const {value} = event.target;
        setDocentEmail(value);
    }

    async function onAddingDocent(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        try{
            const respone = await addDocentToStudent(docentEmail);
            console.log(respone.message)
            if (respone.message === "Docent gekoppeld") {
                showModal("Gelukt!", "De docent is toegevoegd!", "success")
            } else if(respone.message === "Docent email was not found in the db") {
                showModal("Oeps", "De email die je hebt ingevuld is niet gekoppeld aan een docent, check of de email correct is", "error")
            } else if(respone.message === "Koppeling bestaat al") {
                showModal("Oeps", "De docent die je nu wou toevoegen is al toegevoegd", "error")
            } else {
                showModal("Oeps", "Er is iets fout gegeaan bij het toevoegen van de docent", "error")
            }
        } catch {
            showModal("Oeps", "Er is iets fout gegeaan bij het toevoegen van de docent", "error")
        } finally {
            setLoading(false);
        }
    }

    async function onUpdateLeesProfiel(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        try {
            await updateLeesprofielData(profiel);
            setProfiel(profiel);
            showModal("Gelukt!", "Je leesprofiel is opgeslagen.", "success");
        } catch (error) {
            showModal(
                "Er ging iets mis",
                error instanceof Error ? error.message : "Probeer het later opnieuw.",
                "error"
            );
        } finally {
            setSaving(false);
        }
    }

    return {profiel, loading, saving, onUpdateLeesProfiel, onAddingDocent, modal, closeModal, handleChange, handleChangeDocentForm };
}