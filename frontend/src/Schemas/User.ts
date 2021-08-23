import { LOCAL_STORAGE_KEYS } from "../constants";
import axios from "axios";

export default class User {
    static register(name: String, password: String): void {
        const registerURL: String = "http://localhost:8080/register";
        console.log('in reg')
        axios.post(registerURL as string, {
            name, password
        }).then(
            res => {
                alert('Registered with success! You will be redirected to login!');
                window.location.href = '/login';
            },
            err => {
                alert('Register failed!')
                console.error(err);
            }
        );
    };

    static login (name: string, password: string): void {
        const loginURL: string = "http://localhost:8080/login";
        axios.post(loginURL, {
            name, password
        }).then(res => {
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.NAME, name);
            window.localStorage.setItem(LOCAL_STORAGE_KEYS.PASSWORD, password);
            window.location.assign('/');
        }, err => {
            alert('login failed!');
            console.error(err);
        })
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