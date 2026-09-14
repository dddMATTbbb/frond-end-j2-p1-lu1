import Navbar from "../components/Navbar.tsx";
import LoadButton from "../components/LoadButton.tsx";

export function ForYouPage() {
    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center h-screen w-full">
                <LoadButton/>
            </div>
        </>
    )
}