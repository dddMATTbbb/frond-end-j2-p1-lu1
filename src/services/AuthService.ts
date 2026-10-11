import {type AuthCredentials} from "../types/auth.ts";

export const loginUser = async (credentials: AuthCredentials) => {
    try{
        const response = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        return response.json();
    } catch(error) {
        return {message: "service_unavailable"}
    }
};

export const signupUser = async (credentials: AuthCredentials) => {
    const response = await fetch("http://localhost:3000/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        return response.json();
    }

    return response.json();
}