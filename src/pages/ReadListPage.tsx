import Navbar from "../components/Navbar.tsx";
import {useReadListPage} from "../hooks/useReadListPage.ts";
import BoekCard from "../components/BoekCard.tsx";

export function ReadListPage(){
    const {loading, leesLijst} = useReadListPage();


    return (
        <>
            <Navbar />
            {loading ? (
                <p>loading...</p>
            ) : (
                <div className="flex h-screen w-full">
                    {!leesLijst || leesLijst.length === 0 ? (
                        <p>Je hebt geen boeken in je leeslijst</p>
                    ) : (
                        leesLijst.map((leesLijst) => (
                            <BoekCard
                                key={leesLijst.id}
                                titel={leesLijst.Titel}
                                auteur={leesLijst.Auteur}
                            />
                        ))
                    )}
                </div>
            )}
        </>
    )
}