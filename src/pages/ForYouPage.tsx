import Navbar from "../components/Navbar.tsx";
import useForYou from "../hooks/useForYou.ts";
import BoekCardSkeleton from "../components/BoekCardSkeleton.tsx";
import BoekCard from "../components/BoekCard.tsx";

export function ForYouPage() {
    const {loading, boeken, updateReadStatus, addToLeesLijst} = useForYou();
    const SKELETON_KEYS = Array.from({ length: 30 }, (_, i) => `skeleton-${i}`);
    return (
        <>
            <Navbar/>
            <div className="flex items-start w-full p-10 flex-wrap gap-6">
                {loading
                    ? SKELETON_KEYS.map((key) => <BoekCardSkeleton key={key} />)
                    : boeken.map((boek) => (
                        <>
                            <BoekCard
                                key={boek.id}
                                id={boek.id}
                                isRead={boek.isRead}
                                isBookmarked={boek.isBookmarked}
                                titel={boek.Titel}
                                auteur={boek.Auteur}
                                addToLeesLijst={() => addToLeesLijst(boek.id, boek.isBookmarked)}
                                toggleRead={() => updateReadStatus(boek.id, boek.isRead)}
                            />
                        </>
                    ))}
            </div>
        </>
    )
}