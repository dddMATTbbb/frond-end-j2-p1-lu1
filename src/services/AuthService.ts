import {type LoginCredentials, type LoginResponse} from "../types/auth.ts";

export const loginUser = async (credentials: LoginCredentials) => {
    const response = await fetch('http://127.0.0.1:3000/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Inloggen mislukt');
    }

    return response.json();
};