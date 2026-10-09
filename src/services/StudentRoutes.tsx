import { Navigate, Outlet, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import type { profileCheckResponse } from "../types/auth.ts";
import Spinner from "../components/Spinner.tsx";

export const StudentRoutes = () => {
    const navigate = useNavigate();
    const [isStudent, setIsStudent] = useState<boolean | null>(null);

    useEffect(() => {
        const validateStudent = async () => {
            try{
                const roleResponse = await fetch('http://localhost:3000/checkRole', {
                    method: "GET",
                    credentials: "include",
                })

                if (roleResponse.ok){
                    const body = await roleResponse.json();
                    if (body.message === "student"){
                        setIsStudent(true);
                    } else {
                        setIsStudent(false);
                    }
                }

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
            }catch(error){
                setIsStudent(false);
                console.log(error);
            }
        }

        validateStudent();
    }, [location.pathname, navigate])

    if (isStudent === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return isStudent ? <Outlet /> : <Navigate to="/DocentPanel" replace />;
}