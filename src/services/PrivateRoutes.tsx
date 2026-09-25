import {Navigate, Outlet, useNavigate} from 'react-router-dom'
import {useState, useEffect} from "react";
import type {profileCheckResponse} from "../types/auth.ts";


export const PrivateRoutes = () => {
    const [isAuth, setAuth] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try{
                const response = await fetch("http://localhost:3000/check-auth", {
                    method: "GET",
                    credentials: "include",
                });

                setAuth(response.status === 200);
            }catch(err){
                setAuth(false);
            }
        };

        const checkProfile = async () => {
            try{
                const response = await fetch('http://localhost:3000/leesProfiel', {
                    method: "GET",
                    credentials: "include",
                });

                const data: profileCheckResponse = await response.json();
                if(data.message === "Leesprofiel does not exist"){
                    navigate("/LeesprofielQuestionPage");
                }

            }catch (err){
                setAuth(false);
            }
        }

        checkProfile();
        checkAuth();
    }, []);

    if (isAuth === null) {
        return <div>Laden...</div>;
    }

    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
