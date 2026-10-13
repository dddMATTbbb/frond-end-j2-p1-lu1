import {useAuthCard} from "../hooks/useAuthCard.ts";

function AuthCard(){
    const {
        email,
        password,
        error,
        role,
        isSignSucces,
        loading,
        authUi,
        handleAuthChange,
        setIsSignSucces,
        handleAuth,
        setEmail,
        setPassword,
        handleRadioChange,
    } = useAuthCard();

    return (
        <>
            <div className="flex justify-center items-center h-auto min-h-[50%] w-64 min-w-[50%] border-4 rounded-4xl flex-col px-12 py-8">
                <p className="font-bold text-3xl">{authUi.title}</p>

                {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
                {isSignSucces && <p className="text-green-500 mt-4 text-sm">"Het is gelukt om een acount aan te maken, log nu in via de inlog knop beneden"</p>}

                <form onSubmit={handleAuth} className="w-full flex flex-col items-center">
                    <fieldset className="w-full mt-6" disabled={loading}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-b-2 focus:border-blue-400 outline-0 duration-500 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Wachtwoord"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border-b-2 focus:border-blue-400 outline-0 duration-500 w-full mt-8"
                        />
                    </fieldset>
                    <div className="flex w-fit justify-between mt-10 flex-col">
                        <p>Als wie wilt u inloggen?</p>
                        <div className="flex w-full justify-between focus-visible:outline-red-500 focus-visible:outline-2 focus-visible:outline-offset-2">
                            <fieldset>
                                <input
                                    type="radio"
                                    id="student"
                                    name="role"
                                    value="student"
                                    required={true}
                                    disabled={loading}
                                    checked={role === 'student'}
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="student">Student</label>
                            </fieldset>
                            <fieldset>
                                <input
                                    type="radio"
                                    id="docent"
                                    name="role"
                                    value="docent"
                                    required={true}
                                    disabled={loading}
                                    checked={role === 'docent'}
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="docent">Docent</label>
                            </fieldset>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="border-orange-500 bg-orange-500 border-4 rounded-xl mt-8 w-24 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                        {loading ? 'Laden...' : authUi.submitTextButton}
                    </button>
                </form>

                <p className="text-black mt-12">{authUi.vraagTypeAuth}</p>
                <button
                    className="border-orange-500 bg-orange-500 border-4 rounded-xl mt-2 w-32 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={() => {
                        handleAuthChange()
                        setIsSignSucces(false);
                    }}
                >
                    {authUi.changeAuthTypeButtonText}
                </button>
            </div>
        </>
    )
}

export default AuthCard;