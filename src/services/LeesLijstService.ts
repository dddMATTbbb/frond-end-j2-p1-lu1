import type { PaginatedBoeken } from "../types/boeken.ts";

const API_BASE = "http://localhost:3000";

// Haalt alle boeken op die op de leeslijst van de ingelogde gebruiker staan, gepagineerd
export const getLeesLijst = async (page: number = 1, limit: number = 20): Promise<PaginatedBoeken> => {
    try {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const response = await fetch(`${API_BASE}/leesLijst?${params.toString()}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Fout bij ophalen leeslijst: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return {
                boeken: data,
                total: data.length,
                page,
                limit,
                totalPages: Math.ceil(data.length / limit) || 1,
            };
        }
        return {
            boeken: data.boeken ?? [],
            total: typeof data.total === 'number' ? data.total : (data.boeken?.length ?? 0),
            page: typeof data.page === 'number' ? data.page : page,
            limit: typeof data.limit === 'number' ? data.limit : limit,
            totalPages: typeof data.totalPages === 'number' ? data.totalPages : (Math.ceil((data.total ?? 0) / limit) || 1),
        };
    } catch (error) {
        console.error("Fout in getLeesLijst:", error);
        return {
            boeken: [],
            total: 0,
            page,
            limit,
            totalPages: 1,
        };
    }
};

// Voegt een boek toe aan de persoonlijke leeslijst
export const addToLeesLijst = async (boekId: string, isBookmarked:boolean) => {
    isBookmarked = !isBookmarked;
    console.log(boekId, isBookmarked);
    try {
        const response = await fetch(`${API_BASE}/leesLijst`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ boekId, isBookmarked }),
        });

        if (!response.ok) {
            throw new Error(`Fout bij toevoegen/verwijderen aan leeslijst: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Fout in addToLeesLijst:", error);
        throw error;
    }
};