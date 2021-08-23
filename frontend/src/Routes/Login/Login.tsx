import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "../../Schemas/User";

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
        User.login(name, password);
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