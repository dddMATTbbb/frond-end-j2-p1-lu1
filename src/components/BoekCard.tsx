interface BoekCardProps{
    key: string;
    titel:string;
    auteur:string;
    coverUrl?:string;
}

export default function BoekCard({key, titel, auteur, coverUrl}: BoekCardProps){
    return (
        <>
            <div className="flex flex-col justify-center items-center border-black border-2 rounded-md w-60 h-96 p-5">
                <img
                    src={coverUrl ?? "../src/assets/defaultBookCover.jpg"}
                    loading="lazy"
                    className="w-full h-auto rounded-md"
                />
                <div className="flex flex-row items-end justify-between w-full mt-2">
                    <div className="grow min-w-0">
                        <h3 className="text-lg font-semibold truncate">{titel}</h3>
                        <p className="text-gray-600">{auteur}</p>
                    </div>
                    <button
                        type="button"
                        aria-label="Like"
                        className="shrink-0 h-10 w-10 rounded-full border flex items-center justify-center"
                    >
                    </button>
                </div>
            </div>
        </>
    )
}