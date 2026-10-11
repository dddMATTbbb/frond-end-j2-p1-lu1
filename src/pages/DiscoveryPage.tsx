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
        unableToLoadBoeken,
        setZoekTerm,
        handleSubmit,
        addToLeesLijst,
        updateReadStatus
    } = useDiscoveryPage();

    if(unableToLoadBoeken) {
        return (
            <>
                <div className="flex items-center justify-center h-full w-full flex-col">
                    <h2>Sorry!</h2>
                    <p>We konden helaas niet de Boeken laden :(</p>
                    <p>Probeer het later opnieuw</p>
                </div>
            </>
        )
    }

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
                    ? Array.from({ length: 30 }).map((_, i) => (
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