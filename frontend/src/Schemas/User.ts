import { LOCAL_STORAGE_KEYS } from "../constants";

export default class User {
    static isLoggedIn(): boolean {
        if (window.localStorage.getItem(LOCAL_STORAGE_KEYS.NAME)) {
            return true;
        }
        return false;
    }
    static logOut(): void {
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.NAME, '');
        window.localStorage.setItem(LOCAL_STORAGE_KEYS.PASSWORD, '');
    }
    static getName(): string | null {
        return window.localStorage.getItem(LOCAL_STORAGE_KEYS.NAME);
    }
}