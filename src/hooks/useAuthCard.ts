import { useState } from "react";
import { loginUser, signupUser } from "../services/AuthService.ts";
import { type AuthCredentials } from "../types/auth.ts";
import {useNavigate} from "react-router-dom";
import type {AuthUi} from "../types/AuthUi.ts";

export function useAuthCard() {
    const navigate = useNavigate();

    const loginUi: AuthUi = {
        title: "Login",
        submitTextButton: "Login",
        vraagTypeAuth: "Heb je geen account?",
        changeAuthTypeButtonText: "Aanmelden",
    }

    const signupUi: AuthUi = {
        title: "Aanmelden",
        submitTextButton: "Aanmelden",
        vraagTypeAuth: "Al een account?",
        changeAuthTypeButtonText: "Login",
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isTypeAuthLogin, setTypeAuthLogin] = useState(true);
    const [isSignSucces, setIsSignSucces] = useState<boolean>(false);

    const authUi = isTypeAuthLogin ? loginUi : signupUi;

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
                    if(role === 'student'){
                        console.log("going to VoorJou")
                        navigate("/VoorJou", {replace: true});
                    } else {
                        console.log("going to /DocentPanel")
                        navigate("/DocentPanel", {replace: true});
                    }
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

    const handleAuthChange = () => {
        setTypeAuthLogin(prev => !prev);
    };

    return {
        email,
        password,
        role,
        error,
        isSignSucces,
        loading,
        authUi,
        handleAuthChange,
        setIsSignSucces,
        handleAuth,
        setEmail,
        setPassword,
        handleRadioChange}
}