import backArrow from "../assets/back_arrow.svg";
import { useParams } from "react-router-dom";

export default function ViewStudentPage() {
    const {id} = useParams<{id: string}>();

    return (
        <>
            <header className="bg-white w-full z-1 p-5 shadow">
                <img className={"border-2 rounded-md w-10 h-10"} alt={"terug knop"} src={backArrow}/>
            </header>
        </>
    )
}