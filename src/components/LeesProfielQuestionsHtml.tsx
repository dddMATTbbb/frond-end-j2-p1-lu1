import {useLeesprofielQuestForm} from "../hooks/useLeesprofielQuestionForm.ts";

type Props = {
    form: ReturnType<typeof useLeesprofielQuestForm>["form"];
    handleChange: ReturnType<typeof useLeesprofielQuestForm>["handleChange"];
};

export default function LeesProfielQuestionsHtml({form, handleChange}: Props) {
    return (
        <>
            <div className="flex items-center justify-center flex-col">
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
                        onChange={handleChange}
                        value={form?.leeftijd ?? 16}
                    />
                </fieldset>

                <fieldset className="w-full mt-5">
                    <label htmlFor="gender">Gender: </label>
                    <select
                        required
                        name="gender"
                        id="gender"
                        className="outline-none border-2 rounded-md"
                        onChange={handleChange}
                        value={form?.gender ?? ''}
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
                        onChange={handleChange}
                        value={form?.leesniveau ?? ''}
                    >
                        <option value=""></option>
                        <option value="2F">2F</option>
                        <option value="3F">3F</option>
                        <option value="2/3F">2/3F</option>
                    </select>
                </fieldset>

                <fieldset className="w-full mt-5">
                    <label htmlFor="favorieteTypeMatariaal">Favoriete lees materiaal: </label>
                    <select
                        required
                        name="favorieteTypeMatariaal"
                        id="favorieteTypeMatariaal"
                        className="outline-none border-2 rounded-md"
                        onChange={handleChange}
                        value={form?.favorieteTypeMatariaal ?? ''}
                    >
                        <option value=""></option>
                        <option value="Boek - roman">Roman</option>
                        <option value="Boek - thriller">Thriller</option>
                        <option value="blogpost">Blogpost</option>
                        <option value="tijdschrift">tijdschrift</option>
                    </select>
                </fieldset>
            </div>
        </>
    )
}