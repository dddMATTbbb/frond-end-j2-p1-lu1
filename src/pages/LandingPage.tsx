import AuthCard from "../components/AuthCard.tsx";
import {useState} from "react";

export function LandingPage() {
    const [typeAuthLogin, setTypeAuthLogin] = useState<boolean>(true);

    return (
        <>
            <div className="flex justify-center items-center h-screen w-full flex-col">
                <h1 className="text-black text-7xl text-center mb-20">Welkom bij kiesboek</h1>
                <AuthCard />
            </div>
        </>
    );
}