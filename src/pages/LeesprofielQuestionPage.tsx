import {useLeesprofielQuestForm} from "../hooks/useLeesprofielQuestionForm.ts";
import Modal from "../components/Modal.tsx";
import LeesprofielQuestionModal from "../components/LeesProfielSuccesModal.tsx";
import LeesProfielQuestionsHtml from "../components/LeesProfielQuestionsHtml.tsx";

export function LeesprofielQuestionPage() {
    const {
        handleSubmit,
        isSubmitSuccess,
        setIsSubmitSuccess,
        form,
        handleChange,
    } = useLeesprofielQuestForm();

    return (
        <>
            <Modal
                isOpen={isSubmitSuccess}
                onClose={() => setIsSubmitSuccess(false)}
                title={"Succes!"}
                children={<LeesprofielQuestionModal />}>
            </Modal>
            <div className="flex items-center justify-center w-full h-screen flex-col">
                <p className="text-black, text-2xl">Een paar vragen om achter jou boeken intresse te komen</p>
                <div className="border-2 rounded-md p-5 mt-20">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-center flex-col">
                            <LeesProfielQuestionsHtml form={form} handleChange={handleChange} />
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