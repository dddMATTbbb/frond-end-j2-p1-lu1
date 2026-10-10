import Navbar from "../components/Navbar.tsx";
import {useReadListPage} from "../hooks/useReadListPage.ts";
import BoekCard from "../components/BoekCard.tsx";

export function ReadListPage(){
    const {loading, leesLijst, addToLeesLijst, updateReadStatus} = useReadListPage();


    return (
        <>
            <Navbar />
            {loading ? (
                <p>loading...</p>
            ) : (
                <div className="flex items-start w-full p-10 flex-wrap gap-6 mt-6">
                    {!leesLijst || leesLijst.length === 0 ? (
                        <p>Je hebt geen boeken in je leeslijst</p>
                    ) : (
                        leesLijst.map((leesLijst) => (
                            <BoekCard
                                key={leesLijst.id}
                                id={leesLijst.id}
                                titel={leesLijst.Titel}
                                auteur={leesLijst.Auteur}
                                isRead={leesLijst.isRead}
                                isBookmarked={leesLijst.isBookmarked}
                                addToLeesLijst={() => addToLeesLijst(leesLijst.id, leesLijst.isBookmarked)}
                                toggleRead={() => updateReadStatus(leesLijst.id, leesLijst.isRead)}
                            />
                        ))
                    )}
                </div>
            )}
        </>
    )
}