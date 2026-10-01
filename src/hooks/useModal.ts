// hooks/useModal.ts
import { useState } from "react";

export type ModalVariant = "error" | "success" | "neutral";

interface ModalState {
    isOpen: boolean;
    title: string;
    message: string;
    variant: ModalVariant;
}

export function useModal() {
    const [modal, setModal] = useState<ModalState>({
        isOpen: false,
        title: "",
        message: "",
        variant: "neutral",
    });

    const showModal = (title: string, message: string, variant: ModalVariant) =>
        setModal({ isOpen: true, title, message, variant });

    const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

    return { modal, showModal, closeModal };
}