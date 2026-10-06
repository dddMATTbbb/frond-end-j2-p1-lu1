import type { Boek } from "../types/boeken.ts";

const API_BASE = "http://localhost:3000";

// Haalt alle boeken op die op de leeslijst van de ingelogde gebruiker staan
export const getLeesLijst = async (): Promise<Boek[]> => {
    try {
        const response = await fetch(`${API_BASE}/leesLijst`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Fout bij ophalen leeslijst: ${response.statusText}`);
        }
        const data: Boek[] = await response.json();
        return data;
    } catch (error) {
        console.error("Fout in getLeesLijst:", error);
        return [];
    }
};

// Voegt een boek toe aan de persoonlijke leeslijst
export const addToLeesLijst = async (boekId: string) => {
    try {
        const response = await fetch(`${API_BASE}/leesLijst`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ boekId }),
        });

        if (!response.ok) {
            throw new Error(`Fout bij toevoegen aan leeslijst: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Fout in addToLeesLijst:", error);
        throw error;
    }
};

// Verwijdert een boek uit de persoonlijke leeslijst
export const removeFromLeesLijst = async (boekId: string) => {
    try {
        const response = await fetch(`${API_BASE}/leesLijst`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ boekId }),
        });

        if (!response.ok) {
            throw new Error(`Fout bij verwijderen uit leeslijst: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fout in removeFromLeesLijst:", error);
        throw error;
    }
};

// Past de 'wel/niet gelezen' (isRead) status aan voor een boek
export const toggleLeesStatus = async (boekId: string, isRead?: boolean) => {
    try {
        const response = await fetch(`${API_BASE}/leesLijst/status`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ boekId, isRead }),
        });

        if (!response.ok) {
            throw new Error(`Fout bij bijwerken leesstatus: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fout in toggleLeesStatus:", error);
        throw error;
    }
};