import { useState } from "react";
import { loginUser } from "../services/AuthService.ts";
import { type LoginCredentials, type LoginResponse } from "../types/auth.ts";

function LoginCard(){
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
    }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const credentials: LoginCredentials = { email, password };
            const response: LoginResponse = await loginUser(credentials, role);
            console.log("Inloggen geslaagd:", response);
        } catch (err: any) {
            setError(err.message || 'Er is iets misgegaan');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center h-auto min-h-[50%] w-1/4 border-4 rounded-4xl flex-col px-12 py-8">
                <p className="font-bold text-3xl">Login</p>

                {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

                <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
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
                        {loading ? 'Laden...' : 'Aanmelden'}
                    </button>
                </form>

                <p className="text-black mt-12">Heb je geen account?</p>
                <button className="border-orange-500 bg-orange-500 border-4 rounded-xl mt-2 w-32 hover:bg-orange-400 hover:border-orange-400 duration-500">
                    Account maken
                </button>
            </div>
        </>
    )
}

export default LoginCard;