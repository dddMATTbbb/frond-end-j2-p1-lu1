import Navbar from "../components/Navbar.tsx";
import {useProfilePage} from "../hooks/ProfilePageHook.ts";
import SubmitFormButton from "../components/SubmitFormButton.tsx";
import Modal from "../components/Modal.tsx";

export function ProfilePage() {
    const {profiel, loading, onUpdateLeesProfiel, modal, closeModal, handleChange } = useProfilePage();

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
            <div className="flex h-screen w-full p-5">
                <form onSubmit={onUpdateLeesProfiel}>
                    <fieldset>
                        <h2 className="text-xl">Profiel gegevens:</h2>
                        <fieldset className="w-full">
                            <label htmlFor="leeftijd">Leeftijd: </label>
                            <input
                                required
                                className="border-b-2 outline-none"
                                type="number"
                                id="leeftijd"
                                name="leeftijd"
                                min="16"
                                max="120"
                                value={profiel?.leeftijd}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <fieldset className="w-full mt-5">
                            <label htmlFor="gender">Gender: </label>
                            <select
                                required
                                name="gender"
                                id="gender"
                                className="outline-none border-2 rounded-md"
                                value={profiel?.gender}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="man">Man</option>
                                <option value="vrouw">Vrouw</option>
                                <option value="non-binair">Non-binair</option>
                                <option value="anders">Anders</option>
                            </select>
                        </fieldset>

                        <fieldset className="w-full mt-5">
                            <label htmlFor="leesniveau">Leesniveau: </label>
                            <select
                                required
                                name="leesniveau"
                                id="leesniveau"
                                className="outline-none border-2 rounded-md"
                                value={profiel?.leesniveau}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="2F">2F</option>
                                <option value="3F">3F</option>
                                <option value="2/3F">2/3F</option>
                            </select>
                        </fieldset>

                        <fieldset className="w-full mt-5">
                            <label htmlFor="genre">Favoriete genre: </label>
                            <select
                                required
                                name="genre"
                                id="genre"
                                className="outline-none border-2 rounded-md"
                                value={profiel?.genre}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="roman">Roman</option>
                                <option value="thriller">Thriller</option>
                                <option value="romantiek">Romantiek</option>
                                <option value="fantasy">Fantasy</option>
                            </select>
                        </fieldset>
                    </fieldset>
                    <SubmitFormButton buttonText={"Updaten"} disabledVar={loading} />
                </form>
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