import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLeesprofielQuestForm} from "../hooks/useLeesprofielQuestionForm.ts";
import Modal from "../components/Modal.tsx";

export function LeesprofielQuestionPage() {
    const navigate = useNavigate();
    const {
        setLeeftijd,
        setGender,
        setLeesNiveau,
        setGenre,
        handleSubmit,
        isSubmitSuccess,
        setIsSubmitSuccess,
    } = useLeesprofielQuestForm();

    return (
        <>
            <Modal
                isOpen={isSubmitSuccess}
                onClose={() => setIsSubmitSuccess(false)}
                title={"Succes!"}
                children={<><p>Er is succesvol een leesprofiel aangemaakt, klik op de knop om verder te gaan</p> <button onClick={() => navigate("/VoorJou")}>Verder</button></>}>
            </Modal>
            <div className="flex items-center justify-center w-full h-screen flex-col">
                <p className="text-black, text-2xl">Een paar vragen om achter jou boeken intresse te komen</p>
                <div className="border-2 rounded-md p-5 mt-20">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-center flex-col">
                            <fieldset className="w-full">
                                <label htmlFor="age">Leeftijd: </label>
                                <input
                                    required
                                    className="border-b-2 outline-none"
                                    type="number"
                                    id="age"
                                    name="age"
                                    min="16"
                                    max="120"
                                    onChange={(e) => setLeeftijd(+e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="w-full mt-5">
                                <label htmlFor="gender">Gender: </label>
                                <select required name='gender' id={'gender'} className="outline-none border-2 rounded-md"
                                        onChange={(e) => setGender(e.target.value)}>
                                    <option value=""></option>
                                    <option value="man">Man</option>
                                    <option value="vrouw">Vrouw</option>
                                    <option value="non-binair">Non-binair</option>
                                    <option value="anders">Anders</option>
                                </select>
                            </fieldset>
                            <fieldset className="w-full mt-5">
                                <label htmlFor="leesNivea">Leesniveau: </label>
                                <select required name='gender' id={'gender'} className="outline-none border-2 rounded-md"
                                        onChange={(e) => setLeesNiveau(e.target.value)}>
                                    <option value=""></option>
                                    <option value="2F">2F</option>
                                    <option value="3F">3F</option>
                                    <option value="2/3F">2/3F</option>
                                </select>
                            </fieldset>
                            <fieldset className="w-full mt-5">
                                <label htmlFor="genre">Favoriete genre: </label>
                                <select required name='genre' id={'genre'} className="outline-none border-2 rounded-md"
                                        onChange={(e) => setGenre(e.target.value)}>
                                    <option value=""></option>
                                    <option value="roman">Roman</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="romantiek">Romantiek</option>
                                    <option value={"fantasy"}>Fantasy</option>
                                </select>
                            </fieldset>
                            <button
                                type={"submit"}
                                className={"border-orange-500 bg-orange-500 border-4 rounded-xl mt-2 w-32 hover:bg-orange-400 hover:border-orange-400 duration-500"}>
                                Indienen
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}