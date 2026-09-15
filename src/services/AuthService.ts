import {type LoginCredentials, type LoginResponse} from "../types/auth.ts";

export const loginUser = async (credentials: LoginCredentials, role: string) => {
    let apiEndpoint:string
    if(role === 'student'){
        apiEndpoint = "http://127.0.0.1:3000/loginStudent"
    }
    else if(role === 'docent'){
        apiEndpoint = "http://127.0.0.1:3000/loginDocent"
    }
    else {
        //TODO: error terug geven
        return;
    }

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Inloggen mislukt');
    }

    return response.json();
};