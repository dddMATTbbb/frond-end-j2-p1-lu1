interface Props {
    buttonText: string
    disabledVar: boolean
    alt:string
}

export default function SubmitFormButton(props: Props) {
    return (
        <>
            <button
                aria-label={props.alt}
                disabled={props.disabledVar}
                type={"submit"}
                className={"border-orange-500 bg-orange-500 border-4 rounded-xl mt-2 w-32 hover:bg-orange-400 hover:border-orange-400 duration-500"}>
                {props.buttonText}
            </button>
        </>
    )
}
