export function getUserToken(): string | null {
    return localStorage.getItem('user_token');
}

export function saveUserToken(token: string) {
    localStorage.setItem('user_token', token);
}