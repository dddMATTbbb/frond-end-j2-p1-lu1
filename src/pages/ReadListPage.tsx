import Navbar from "../components/Navbar.tsx";
import {useReadListPage} from "../hooks/useReadListPage.ts";
import BoekCard from "../components/BoekCard.tsx";
import BoekCardSkeleton from "../components/BoekCardSkeleton.tsx";

export function ReadListPage(){
    const {loading, leesLijst, addToLeesLijst, updateReadStatus} = useReadListPage();

    // eslint-disable-next-line react/no-array-index-key
    const skeletons = Array.from({ length: 30 }).map((_, i) => <BoekCardSkeleton key={`skeleton-${i}`} />);

    return (
        <>
            <Navbar />
            {loading ? (
                skeletons
            ) : (
                <div className="flex items-start w-full p-10 flex-wrap gap-6 mt-6">
                    {!leesLijst || leesLijst.length === 0 ? (
                        <p>Je hebt geen boeken in je leeslijst</p>
                    ) : (
                        leesLijst.map((boek) => (
                            <BoekCard
                                key={boek.id}
                                id={boek.id}
                                titel={boek.Titel}
                                auteur={boek.Auteur}
                                isRead={boek.isRead}
                                isBookmarked={boek.isBookmarked}
                                addToLeesLijst={() => addToLeesLijst(boek.id, boek.isBookmarked)}
                                toggleRead={() => updateReadStatus(boek.id, boek.isRead)}
                            />
                        ))
                    )}
                </div>
            )}
        </>
    )
}