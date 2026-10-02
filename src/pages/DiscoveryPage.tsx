import Navbar from "../components/Navbar.tsx";
import BoekCard from "../components/BoekCard.tsx";
import {useDiscoveryPage} from "../hooks/useDiscoveryPage.ts";

export function DiscoveryPage() {
    const {
        boeken,
        loading
    } = useDiscoveryPage();

    if (loading) {
        return <p>loading...</p>;
    }

    return (
        <>
            <Navbar/>
            <div className="flex justify-baseline items-start h-screen w-full p-10 flex-wrap gap-6">
                {boeken.map((boek) => (
                    <BoekCard key={boek.id} titel={boek.Titel} auteur={boek.Auteur} />
                ))}
            </div>
        </>
    )
}