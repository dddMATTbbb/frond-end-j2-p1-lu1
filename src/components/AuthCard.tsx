import { useState } from "react";
import { loginUser, signupUser } from "../services/AuthService.ts";
import { type AuthCredentials, type LoginResponse, type SignupResponse } from "../types/auth.ts";

function AuthCard(){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isTypeAuthLogin, setTypeAuthLogin] = useState(true);
    const [isSignSucces, setIsSignSucces] = useState<boolean>(false);

    let title:string;
    let submitButtonText:string;
    let vraagTypeAuth:string;
    let changeAuthTypeButtonText:string;

    if(isTypeAuthLogin){
        title = "Login";
        submitButtonText = "Login";
        vraagTypeAuth = "Heb je geen account?";
        changeAuthTypeButtonText = "Aanmelden";
    }
    else {
        title = "Aanmelden";
        submitButtonText = "Aanmelden";
        vraagTypeAuth = "Al een account?";
        changeAuthTypeButtonText = "Login";
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
    }

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // voorkomt page reload
        //Voor test, normaal gewoon: setLoading(true)
        function wait() {
            setLoading(true);
        }
        setTimeout(wait, 5000);
        setError(null);

        try {
            const credentials: AuthCredentials = { email, password, role };
            if(isTypeAuthLogin){
                await loginUser(credentials);
                //TODO: aangeven wanner inloggen niet gelukt is
                //TODO: doorsturen naar de VoorJou als het gelukt is
            }
            else {
                const res = await signupUser(credentials);
                console.log(res);
                if(res.message === "Succesvol aangemeld"){
                    setIsSignSucces(true);
                }
            }
        } catch (err: any) {
            setError(err.message || 'Er is iets misgegaan');
        } finally {
            setLoading(false);
        }
    };

    const changeAuthType = () => {
        setTypeAuthLogin(!isTypeAuthLogin);
    }

    return (
        <>
            <div className="flex justify-center items-center h-auto min-h-[50%] w-1/4 border-4 rounded-4xl flex-col px-12 py-8">
                <p className="font-bold text-3xl">{title}</p>

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
                        <div className="flex w-full justify-between">
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
                        className="border-orange-500 bg-orange-500 border-4 rounded-xl mt-8 w-24 hover:bg-orange-400 hover:border-orange-400 duration-500 disabled:opacity-50"
                    >
                        {loading ? 'Laden...' : submitButtonText}
                    </button>
                </form>

                <p className="text-black mt-12">{vraagTypeAuth}</p>
                <button
                    className="border-orange-500 bg-orange-500 border-4 rounded-xl mt-2 w-32 hover:bg-orange-400 hover:border-orange-400 duration-500"
                    onClick={() => {
                        changeAuthType()
                        setIsSignSucces(false);
                    }}
                >
                    {changeAuthTypeButtonText}
                </button>
            </div>
        </>
    )
}

export default AuthCard;