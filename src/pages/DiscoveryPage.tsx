import Navbar from "../components/Navbar.tsx";
import BoekCard from "../components/BoekCard.tsx";
import {useDiscoveryPage} from "../hooks/useDiscoveryPage.ts";
import DiscoveryPageFilterBar from "../components/DiscoveryPageFilterBar.tsx";
import BoekCardSkeleton from "../components/BoekCardSkeleton.tsx";
import Pagination from "../components/Pagination.tsx";

export function DiscoveryPage() {
    const {
        boeken,
        loading,
        boekFilter,
        unableToLoadBoeken,
        page,
        totalPages,
        handlePageChange,
        handleChange,
        handleSubmit,
        addToLeesLijst,
        updateReadStatus
    } = useDiscoveryPage();

    const SKELETON_KEYS = Array.from({ length: 20 }, (_, i) => `skeleton-${i}`);

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
                boekFilter={boekFilter}
                setBoekFilter={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
            />
            <div className="flex items-start w-full p-10 flex-wrap gap-6">
                {loading
                    ? SKELETON_KEYS.map((key) => <BoekCardSkeleton key={key} />)
                    : boeken.length === 0
                        ? <p className="text-gray-500 text-lg">Geen boeken gevonden.</p>
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
            {!loading && boeken.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    disabled={loading}
                />
            )}
        </>
    )
}
