import Navbar from "../components/Navbar.tsx";
import LeesProfielQuestionsHtml from "../components/LeesProfielQuestionsHtml.tsx";
import {useLeesprofielQuestForm} from "../hooks/useLeesprofielQuestionForm.ts";

export function ProfilePage() {
    const {
        form,
        handleChange
    } = useLeesprofielQuestForm();

    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center h-screen w-full">
                <div className={"flex justify-center items-center w-fit h-fit border-2 border-black rounded-md p-12"}>
                    <LeesProfielQuestionsHtml form={form} handleChange={handleChange} />
                </div>
            </div>
        </>
    )
}