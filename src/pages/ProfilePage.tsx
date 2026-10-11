import Navbar from "../components/Navbar.tsx";
import {useProfilePage} from "../hooks/ProfilePageHook.ts";
import SubmitFormButton from "../components/SubmitFormButton.tsx";
import Modal from "../components/Modal.tsx";
import LeesProfielQuestionsHtml from "../components/LeesProfielQuestionsHtml.tsx";

export function ProfilePage() {
    const {profiel, loading, onUpdateLeesProfiel, onAddingDocent, modal, closeModal, handleChange, handleChangeDocentForm } = useProfilePage();

    if (loading) {
        return (
            <>
                <Navbar />
                <p className="p-5">Laden...</p>
            </>
        );
    }

    return (
        <>
            <Navbar/>
            <div className="flex flex-col h-screen w-full p-5">
                <div className="border-3 w-fit h-fit border-black rounded-md p-5 mb-10">
                    <h2 className="font-bold mb-5 text-2xl">Verander je leesprofiel:</h2>
                    <form onSubmit={onUpdateLeesProfiel}>
                        <LeesProfielQuestionsHtml form={profiel} handleChange={handleChange} />
                        <SubmitFormButton buttonText={"Updaten"} disabledVar={loading} alt={"Profiel updaten"} />
                    </form>
                </div>
                <div className="flex-col flex border-3 w-fit h-fit border-black rounded-md p-5">
                    <h2 className="font-bold mb-5 text-2xl">Voeg een docent toe:</h2>
                    <form onSubmit={onAddingDocent}>
                        <fieldset>
                            <input required className={"border-b-2 outline-none mr-6"}
                                id={"email"} name={"email"} type={"text"} placeholder={"mail@domein.nl"} onChange={handleChangeDocentForm} />
                            <SubmitFormButton buttonText={"Toevoegen"} disabledVar={loading} alt={"Docent toevoegen"} />
                        </fieldset>
                    </form>
                </div>
                <Modal
                    isOpen={modal.isOpen}
                    onClose={closeModal}
                    title={modal.title}
                    variant={modal.variant}
                    description={modal.message}
                >
                </Modal>
            </div>
        </>
    )
}
