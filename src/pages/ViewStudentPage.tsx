import backArrow from "../assets/back_arrow.svg";
import { useParams } from "react-router-dom";
import useViewStudentPage from "../hooks/useViewStudent.ts";
import BoekCard from "../components/BoekCard.tsx";

export default function ViewStudentPage() {
    const { id } = useParams<{ id: string }>();
    const {clickBackButton, addToLeesLijst, boeken, loading} = useViewStudentPage(id);

    return (
        <>
            <header className="bg-white w-full z-1 p-5 shadow">
                <img onClick={clickBackButton} className={"border-2 rounded-md w-10 h-10"} alt={"terug knop"} src={backArrow}/>
            </header>
            <div className="flex items-start w-full p-10 flex-wrap gap-6">
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <div className="flex items-start w-full p-10 flex-wrap gap-6">
                        {boeken.map((boek) => (
                            <BoekCard
                                key={boek.id}
                                id={boek.id}
                                isRead={boek.isRead}
                                isBookmarked={boek.isBookmarked}
                                titel={boek.Titel}
                                auteur={boek.Auteur}
                                addToLeesLijst={() => addToLeesLijst(boek.id, boek.isBookmarked)} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}