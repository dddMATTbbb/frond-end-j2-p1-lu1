import { Navigate, Outlet, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import type { profileCheckResponse } from "../types/auth.ts";

export const DocentRoutes = () => {
    const navigate = useNavigate();
    const [isDocent, setIsDocent] = useState<boolean | null>(null);

    useEffect(() => {
        const validateDocent = async () => {
            try{
                const roleResponse = await fetch('http://localhost:3000/checkRole', {
                    method: "GET",
                    credentials: "include",
                })

                if (roleResponse.ok){
                    const body = await roleResponse.json();
                    if (body.message === "docent"){
                        setIsDocent(true);
                    } else {
                        setIsDocent(false);
                    }
                }
            }catch(error){
                setIsDocent(false);
                console.log(error);
            }
        }

        validateDocent();
    }, [location.pathname, navigate])

    if (isDocent === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-lg">Laden...</p>
            </div>
        );
    }

    return isDocent ? <Outlet /> : <Navigate to="/VoorJou" replace />;
}