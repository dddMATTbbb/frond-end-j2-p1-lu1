import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {type Boek} from "../types/boeken.ts";
import {getBoekenStudent, updateLeeslijstStudent} from "../services/DocentService.ts";

export default function useViewStudent(studentId: string | undefined){
    const navigate = useNavigate();
    const [boeken, setBoeken] = useState<Boek[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const emptyBoekList: Boek[] = []

    useEffect(() => {
        async function loadBoeken(){
            try{
                setLoading(true);
                if(!studentId){
                    return emptyBoekList;
                }
                const data: Boek[] = await getBoekenStudent(studentId) ?? emptyBoekList;
                setBoeken(data);
            } catch (error){
                console.log(error);
                return emptyBoekList;
            }finally {
                setLoading(false);
            }
        }

        loadBoeken();
    }, []);

    const clickBackButton = () => {
        navigate("/DocentPanel");
    }

    const addToLeesLijst = async (boekId:string, isBookmarked:boolean) =>{
        if(!studentId){
            console.error("No student id")
            return;
        }
        try{
            await updateLeeslijstStudent(studentId, boekId, isBookmarked);
            setBoeken(prev =>
                prev.map(boek =>
                    boek.id === boekId
                        ? { ...boek, isBookmarked: !isBookmarked }
                        : boek
                )
            );
        }catch (error) {
            console.error(error);
            throw error;
        }

    }

    return {clickBackButton, addToLeesLijst, boeken, loading};
}