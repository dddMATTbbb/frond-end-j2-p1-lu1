import Navbar from "../components/Navbar.tsx";
import useForYou from "../hooks/useForYou.ts";
import BoekCardSkeleton from "../components/BoekCardSkeleton.tsx";
import BoekCard from "../components/BoekCard.tsx";

export function ForYouPage() {
    const {loading, boeken, updateReadStatus, addToLeesLijst} = useForYou();
    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center h-screen w-full gap-10">
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <BoekCardSkeleton key={i} />
                    ))
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