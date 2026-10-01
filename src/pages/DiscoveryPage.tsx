import Navbar from "../components/Navbar.tsx";
import BoekCard from "../components/BoekCard.tsx";

export function DiscoveryPage() {
    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center h-screen w-full">
                <BoekCard titel={'test'} auteur={'test'} />
            </div>
        </>
    )
}