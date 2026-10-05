import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import type { profileCheckResponse } from "../types/auth.ts";

export const PrivateRoutes = () => {
    const [isAuth, setAuth] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const validateAccess = async () => {
            try {
                const authResponse = await fetch("http://localhost:3000/check-auth", {
                    method: "GET",
                    credentials: "include",
                });

                if (authResponse.status !== 200) {
                    setAuth(false);
                    return;
                }

                setAuth(true);

                const profileResponse = await fetch("http://localhost:3000/leesProfiel", {
                    method: "GET",
                    credentials: "include",
                });

                if (profileResponse.ok) {
                    const data: profileCheckResponse = await profileResponse.json();

                    if (
                        data.message === "Leesprofiel does not exist" &&
                        location.pathname !== "/LeesprofielQuestionPage"
                    ) {
                        navigate("/LeesprofielQuestionPage", { replace: true });
                    }
                }
            } catch (err) {
                console.error("Fout bij toegangscontrole:", err);
                setAuth(false);
            }
        };

        validateAccess();
    }, [location.pathname, navigate]);

    if (isAuth === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-lg">Laden...</p>
            </div>
        );
    }

    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};