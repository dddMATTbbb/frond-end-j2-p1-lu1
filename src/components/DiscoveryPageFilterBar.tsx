import SubmitFormButton from "./SubmitFormButton.tsx";
import type {boekFilter} from "../types/boekFilter.ts";

type Props = {
    boekFilter: boekFilter;
    setBoekFilter: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}

export default function DiscoveryPageFilterBar({ boekFilter, setBoekFilter, handleSubmit, loading }: Props) {

    return (
        <>
            <div className="flex w-full justify-center mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row">
                        <fieldset>
                            <label htmlFor={"taalNiveau"}>Taal niveau: </label>
                            <select
                                name="taalNiveau"
                                id="taalNiveau"
                                className={"mr-3.5 border-2 rounded-md focus-visible:outline-red-500 focus-visible:outline-2 focus-visible:outline-offset-2"}
                                onChange={setBoekFilter}
                                value={boekFilter.taalNiveau ?? undefined}
                            >
                                <option value={undefined}></option>
                                <option value="2F">2F</option>
                                <option value="3F">3F</option>
                                <option value="2F-3F">2/3F</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label htmlFor={"genre"}>Genre: </label>
                            <select
                                name="genre"
                                id="genre"
                                className={"mr-3.5 border-2 rounded-md focus-visible:outline-red-500 focus-visible:outline-2 focus-visible:outline-offset-2"}
                                onChange={setBoekFilter}
                                value={boekFilter.genre ?? undefined}
                            >
                                <option value={undefined}></option>
                                <option value="Boek - roman">Roman</option>
                                <option value="Boek - thriller">Thriller</option>
                                <option value="blogpost">Blogpost</option>
                                <option value="tijdschrift">tijdschrift</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label htmlFor={"onderwerp"}>Onderwerp: </label>
                            <select
                                name="onderwerp"
                                id="onderwerp"
                                className={"mr-3.5 border-2 rounded-md focus-visible:outline-red-500 focus-visible:outline-2 focus-visible:outline-offset-2"}
                                onChange={setBoekFilter}
                                value={boekFilter.onderwerp ?? undefined}
                            >
                                <option value={undefined}></option>
                                <option value="oorlog">Oorlog</option>
                                <option value="herinneringen">Herinneringen</option>
                                <option value="vriendschap">Vriendschap</option>
                                <option value="schuld">Schuld</option>
                            </select>
                        </fieldset>
                        <input
                            type="text"
                            name="zoekTerm"
                            value={boekFilter.zoekTerm ?? undefined}
                            placeholder="Filter op naam of auteur..."
                            className={"border-2 focus:border-blue-400 outline-0 duration-500 rounded-3xl p-2 w-110 mr-3"}
                            onChange={setBoekFilter}
                        />
                        <SubmitFormButton disabledVar={loading} buttonText={"Zoeken"} alt={"Zoeken"} />
                    </div>
                </form>
            </div>
        </>
    )
}
