import {Navigate, Outlet, } from 'react-router-dom'
import {useState, useEffect} from "react";



export const PrivateRoutes = () => {
    const [isAuth, setAuth] = useState<boolean | null>(null);

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

        checkAuth();
    }, []);

    if (isAuth === null) {
        return <div>Laden...</div>;
    }

    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}
