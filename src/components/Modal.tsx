type ModalVariant = "error" | "success" | "neutral";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    variant?: ModalVariant; // standaard "neutral"
}

const variantStyles: Record<ModalVariant, {
    container: string;
    title: string;
    button: string;
    icon: string;
}> = {
    error: {
        container: "bg-red-50 border-red-500",
        title: "text-red-700",
        button: "bg-red-600 hover:bg-red-700",
        icon: "✕",
    },
    success: {
        container: "bg-green-50 border-green-500",
        title: "text-green-700",
        button: "bg-green-600 hover:bg-green-700",
        icon: "✓",
    },
    neutral: {
        container: "bg-blue-50 border-blue-500",
        title: "text-blue-700",
        button: "bg-blue-600 hover:bg-blue-700",
        icon: "i",
    },
};

export default function Modal({
                                  isOpen,
                                  onClose,
                                  children,
                                  title,
                                  variant = "neutral",
                              }: ModalProps) {
    if (!isOpen) return null;

    const styles = variantStyles[variant];

    return (
        <div
            className="fixed inset-0 bg-gray-500/60 flex items-center justify-center z-1000"
            onClick={onClose}
        >
            <div
                role={variant === "error" ? "alertdialog" : "dialog"}
                aria-modal="true"
                className={`flex flex-col p-10 rounded-md w-1/2 max-w-3/5 border-2 ${styles.container}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className={`text-4xl flex items-center gap-3 ${styles.title}`}>
                    <span aria-hidden="true">{styles.icon}</span>
                    {title}
                </h2>

                <div className="mt-4">{children}</div>

                <button
                    onClick={onClose}
                    className={`mt-6 self-end px-4 py-2 rounded-md text-white ${styles.button}`}
                >
                    Sluiten
                </button>
            </div>
        </div>
    );
}