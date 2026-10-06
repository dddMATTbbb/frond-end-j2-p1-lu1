import { useEffect, useState } from "react";
import { getUserLeesprofielData, updateLeesprofielData } from "../services/ProfilePageService";
import { useModal } from "./useModal";
import type { LeesProfiel } from "../types/leesProfiel";

const leegProfiel: LeesProfiel = {
    leeftijd: 0,
    gender: "",
    typeMatriaal: "",
    leesniveau: "",
};

export function useProfilePage() {
    const [profiel, setProfiel] = useState<LeesProfiel>(leegProfiel);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { modal, showModal, closeModal } = useModal();

    // data laden bij openen van de pagina
    useEffect(() => {
        async function load() {
            try {
                const data = await getUserLeesprofielData();
                setProfiel(data ?? leegProfiel);
            } catch {
                showModal("Er ging iets mis", "Je profiel kon niet worden geladen.", "error");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProfiel((prev) => ({
            ...prev,
            [name]: name === "leeftijd" ? Number(value) : value,
        }));
    };

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

    return {profiel, loading, saving, onUpdateLeesProfiel, modal, closeModal, handleChange };
}