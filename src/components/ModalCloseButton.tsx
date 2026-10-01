interface Props {
    onClick: () => void;
    styles: string;
}

export default function ModalCloseButton(props: Props) {
    return (
        <button onClick={props.onClick} className={props.styles}>Sluiten</button>
    )
}