import React from "react";
import {useNavigate} from "react-router-dom";

export default function LeesprofielQuestionModal(){
    const navigate = useNavigate();
    return(
        <>
            <p className={"text-green-400 mt-3"}>Er is succesvol een leesprofiel aangemaakt, klik op de knop om verder te gaan</p>
            <button className={"bg-green-800 mt-10 w-16 h-7 rounded-md text-white"} onClick={() => navigate("/VoorJou")}>Verder</button>
        </>
    )
}