import {useBoekCard} from "../hooks/useBoekCard.ts";

interface BoekCardProps{
    id: string;
    titel:string;
    auteur:string;
    coverUrl?:string;
    isBookmarked:boolean;
    isRead?:boolean;
    addToLeesLijst: (boekId: string, isBookmarked:boolean) => void;
    toggleRead?: (boekId: string, isRead:boolean) => void;
}

export default function BoekCard({id, titel, auteur, coverUrl, isRead, isBookmarked, addToLeesLijst, toggleRead}: BoekCardProps){
    if(!isRead){
        isRead = false;
    }
    if(!toggleRead){
        toggleRead = () => "";
    }

    const {goToBoekInfo} = useBoekCard()

    return (
        <>
            <div onClick={() => goToBoekInfo(id)} className="flex flex-col justify-center items-center border-black border-2 rounded-md w-60 h-96 p-5">
                <img
                    src={coverUrl ?? "../src/assets/defaultBookCover.jpg"}
                    loading="lazy"
                    className="w-full h-auto rounded-md"
                />
                <div className="flex flex-row items-end justify-between w-full mt-2">
                    <div className="grow min-w-0">
                        <h3 className="font-semibold truncate">{titel}</h3>
                        <p className="text-gray-600">{auteur}</p>
                    </div>
                    <input
                        className={"shrink-0 h-10 w-auto"}
                        onClick={() => addToLeesLijst(id, isBookmarked)}
                        type={"image"}
                        src={isBookmarked ? "../src/assets/BookmarkFilled.svg" : "../src/assets/Bookmark.svg"}
                    />
                    <input
                        className={"shrink-0 h-10 w-auto"}
                        onClick={() => toggleRead(id, isRead)}
                        type={"image"}
                        src={isRead ? "../src/assets/book_read.svg" : "../src/assets/book_unread.svg"}
                    />
                </div>
            </div>
        </>
    )
}