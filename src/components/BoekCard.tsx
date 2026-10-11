import {useBoekCard} from "../hooks/useBoekCard.ts";
import coverImg from "../assets/defaultBookCover.jpg"
import bookRead from "../assets/book_read.svg"
import bookUnread from "../assets/book_unread.svg"
import bookmark from "../assets/Bookmark.svg"
import bookmarkFilled from "../assets/BookmarkFilled.svg"

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
            <button onClick={() => goToBoekInfo(id)}>
                <div className="flex flex-col justify-center items-center border-black border-2 rounded-md w-60 h-96 p-5">
                    <img
                        src={coverUrl ?? coverImg}
                        loading="lazy"
                        className="w-full h-auto rounded-md"
                        alt={""}
                    />
                    <div className="flex flex-row items-end justify-between w-full mt-2">
                        <div className="grow min-w-0">
                            <h3 className="font-semibold truncate">{titel}</h3>
                            <p className="text-gray-600">{auteur}</p>
                        </div>
                        <input
                            className={"shrink-0 h-10 w-auto"}
                            onClick={(event) => {
                                event.stopPropagation();
                                addToLeesLijst(id, isBookmarked);
                            }}
                            type={"image"}
                            src={isBookmarked ? bookmarkFilled : bookmark}
                            alt={"Bookmark knop"}
                        />
                        <input
                            className={"shrink-0 h-10 w-auto"}
                            onClick={(event) => {
                                event.stopPropagation();
                                toggleRead(id, isRead);
                            }}
                            type={"image"}
                            src={isRead ? bookRead : bookUnread}
                            alt={"Is gelezen knop"}
                        />
                    </div>
                </div>
            </button>
        </>
    )
}
