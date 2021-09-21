import { LOCAL_STORAGE_KEYS } from "../constants";
import axios from "axios";
import globalVars from "../globalVars";

export default class User {
    static async register(name: String, password: String): Promise<boolean> {
        const registerURL: string = globalVars.API_DOMAIN + "/register";
        let ok: boolean;
        try {
            await axios.post(registerURL, {
                username: name, password
            });
            ok = true;
        } catch (e) {
            ok = false;
        }
        return ok;
    };

    static async login (name: string, password: string): Promise<boolean> {
        const loginURL: string = globalVars.API_DOMAIN + "/login";
        let ok: boolean;
        try {
            await axios.post(loginURL, {
                username: name, password
            });
            ok = true;
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.NAME, name);
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.PASSWORD, password);
        } catch(e) {
            ok = false;
            console.error(e);
        }   
        return ok;
    }

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