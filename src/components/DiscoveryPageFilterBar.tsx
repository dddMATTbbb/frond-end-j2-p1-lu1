import SubmitFormButton from "./SubmitFormButton.tsx";

type Props = {
    zoekTerm: string;
    setZoekTerm: (value: string) => void;
    handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
    loading: boolean;
}

export default function DiscoveryPageFilterBar({ zoekTerm, setZoekTerm, handleSubmit, loading }: Props) {

    return (
        <>
            <div className="flex w-full justify-center mt-5">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={zoekTerm}
                            placeholder="Filter op naam of auteur..."
                            className={"border-2 focus:border-blue-400 outline-0 duration-500 rounded-3xl p-2 w-110 mr-3"}
                            onChange={(event) => {setZoekTerm(event.target.value)}}
                        />
                        <SubmitFormButton disabledVar={loading} buttonText={"Zoeken"} />
                    </div>
                </form>
            </div>
        </>
    )
}