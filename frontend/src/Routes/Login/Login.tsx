import { LOCAL_STORAGE_KEYS } from "../../constants";
import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import User from "../../Schemas/User";
const loginURL: string = "http://localhost:8080/login";

const loginUser = (name: string, password: string): void => {
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

export default function Login(): React.ReactElement {
    let nameInpRef = React.createRef<HTMLInputElement>();
    let passInpRef = React.createRef<HTMLInputElement>();

    React.useEffect(() => {
        //let name: string | null = window.localStorage.getItem(LOCAL_STORAGE_KEYS.NAME);
        if (User.isLoggedIn()) {
            window.location.assign('/');
        }
    }, []);

    const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        let { value: name } = nameInpRef.current!;
        let { value: password } = passInpRef.current!;
        loginUser(name, password);
    }

    return (
        <div>
            <form action="">
                <input ref={nameInpRef} type="text" />
                <br />
                <input ref={passInpRef} type="password" />
                <br />
                <Button onClick={handleBtnClick} variant="primary">login</Button>
            </form>
            Don't have an account:
            <a href="/register"> register</a>
        </div>
    );
}