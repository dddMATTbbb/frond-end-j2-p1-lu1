import {useNavigate} from "react-router-dom";

export function useBoekCard() {
    const navigate = useNavigate();
    const goToBoekInfo = async (boekId:string) => {
        navigate(`/boek/${boekId}`);
    }

    return {goToBoekInfo};
}