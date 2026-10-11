import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect, use} from "react";

export const PrivateRoutes = () => {
    const [isAuth, setAuth] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const pathname = useLocation();
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
            } catch (err) {
                console.error("Fout bij toegangscontrole:", err);
                setAuth(false);
            }
        };

        validateAccess();
    }, [pathname, navigate]);

    if (isAuth === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-lg">Laden...</p>
            </div>
        );
    }

    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
};