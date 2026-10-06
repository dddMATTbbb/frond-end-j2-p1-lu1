export interface Boek {
    id: string;
    _id?: string;
    Titel: string;
    titel?: string;
    Auteur: string;
    auteur?: string;
    Omschrijving?: string;
    'Korte omschrijving'?: string;
    Matriaal?: string;
    'Type materiaal'?: string;
    Niveau?: string;
    Themas?: string;
    Themas_boek?: string;
    coverUrl?: string;
    isBookmarked: boolean;
    isRead?: boolean;
}