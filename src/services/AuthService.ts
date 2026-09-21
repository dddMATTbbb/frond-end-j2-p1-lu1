import {type AuthCredentials, type LoginResponse} from "../types/auth.ts";

export const loginUser = async (credentials: AuthCredentials) => {
    const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });

    const data: LoginResponse = await response.json();

    if (response.ok){
        console.log(data.message)
        return response;
    } else {
        console.error('Unable to login');
        return response;
    }
};

export const signupUser = async (credentials: AuthCredentials) => {
    const response = await fetch("http://127.0.0.1:3000/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Inloggen mislukt');
    }

    return response.json();
}