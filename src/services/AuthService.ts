import {type AuthCredentials, type LoginResponse} from "../types/auth.ts";

export const loginUser = async (credentials: AuthCredentials) => {
    const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });

    if (response.ok){
        return response.json();
    } else {
        return response.json();
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