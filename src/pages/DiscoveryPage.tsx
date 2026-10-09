import Navbar from "../components/Navbar.tsx";
import BoekCard from "../components/BoekCard.tsx";
import {useDiscoveryPage} from "../hooks/useDiscoveryPage.ts";
import DiscoveryPageFilterBar from "../components/DiscoveryPageFilterBar.tsx";
import BoekCardSkeleton from "../components/BoekCardSkeleton.tsx";

export function DiscoveryPage() {
    const {
        boeken,
        loading,
        zoekTerm,
        setZoekTerm,
        handleSubmit,
        addToLeesLijst,
        updateReadStatus
    } = useDiscoveryPage();

    return (
        <>
            <Navbar/>
            <DiscoveryPageFilterBar
                zoekTerm={zoekTerm}
                setZoekTerm={setZoekTerm}
                handleSubmit={handleSubmit}
                loading={loading}
            />
            <div className="flex items-start w-full p-10 flex-wrap gap-6">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <BoekCardSkeleton key={i} />
                    ))
                    : boeken.map((boek) => (
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
                    ))}
                </div>
        </>
    )
}