interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}


export default function Modal({isOpen, onClose, children, title}: ModalProps) {
    if (!isOpen) return null;

    return (
        <>
            <div className={"fixed top-0 left-0 right-0 bottom-0 bg-gray-500 flex items-center justify-center z-1000"}>
                <div className={"flex flex-col bg-white p-10 rounded-md w-1/2 max-w-3/5"}>
                    <h2 className={"text-4xl"}>{title}</h2>
                    <div className={"leading-1"}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}