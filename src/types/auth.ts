export interface AuthCredentials {
    email: string;
    password: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    userId: string;
}

export interface SignupResponse {
    message: string;
}