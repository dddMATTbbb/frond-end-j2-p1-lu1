import backArrow from "../assets/back_arrow.svg";
import { useParams } from "react-router-dom";
import {UseBoekPage} from "../hooks/UseBoekPage.ts";
import BoekRegelsSkeleton from "../components/BoekRegelsSkeleton.tsx";
import BoekCardSkeleton from "../components/BoekCardSkeleton.tsx";
import BoekCard from "../components/BoekCard.tsx";

export default function BoekPage(){
    const { boekId } = useParams<{ boekId: string }>();
    const {loading, boek, handleBackButtonClick} = UseBoekPage(boekId)

    return (
        <>
            <header className="bg-white w-full z-1 p-5 shadow">
                <img onClick={handleBackButtonClick} className={"border-2 rounded-md w-10 h-10"} alt={"terug knop"} src={backArrow}/>
            </header>
            <div className="flex items-start w-full p-10 flex-wrap gap-6">
                {loading ? (
                    <BoekRegelsSkeleton />
                ) : (
                    <>
                        <p>Boek titel: {boek?.Titel}</p>
                        <p>Boek Auteur: {boek?.Auteur}</p>
                        <p>Boek omschrijving: {boek?.["Korte omschrijving"]}</p>
                    </>
                )}
            </div>
        </>
    )
}