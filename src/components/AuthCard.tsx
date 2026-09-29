import { useState } from "react";
import { loginUser, signupUser } from "../services/AuthService.ts";
import { type AuthCredentials } from "../types/auth.ts";
import {useNavigate} from "react-router-dom";

function AuthCard(){
    const navigate = useNavigate();
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
        setLoading(true);
        setError(null);

        try {
            const credentials: AuthCredentials = { email, password, role };
            if(isTypeAuthLogin){
                const response = await loginUser(credentials);
                if(response.message === "Authentication successful"){
                    setError(null)
                    navigate("/VoorJou", {replace: true});
                } else if (response.error === "Ongeldige email of wachtwoord") {
                    setError("Sorry, de combinatie email en wachtwoord is incorrect.")
                } else {
                    console.log(response.error);
                    setError("Sorry er is een fout opgetreden in onze service, probeer het later opnieuw");
                }
            }
            else {
                const response = await signupUser(credentials);
                console.log(response);
                if(response.message === "Succesvol aangemeld"){
                    setError(null);
                    setIsSignSucces(true);
                } else if(response.error === "User already exists"){
                    setError("Deze gebruiker bestaat al, klik op de login knop helemaal beneden om in te loggen met deze gebruiker");
                } else if(response.error === "Invalid input"){
                    setError("Deze input is onjuist, zorg dat je alle velden hebt ingevuld")
                }
                else {
                    console.log(response.error);
                    setError("Er is iets mis gegaan")
                }
            }
        } catch (err: any) {

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