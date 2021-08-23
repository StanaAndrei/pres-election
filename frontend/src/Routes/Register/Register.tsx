import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "../../Schemas/User";

export default function Register(): React.ReactElement {
    let nameInpRef = React.createRef<HTMLInputElement>();
    let passInpRef = React.createRef<HTMLInputElement>();
    let confPassInpRef = React.createRef<HTMLInputElement>();


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        let { value: name } = nameInpRef.current!;
        let { value: password } = passInpRef.current!;
        let { value: password2 } = confPassInpRef.current!;
        if (!name || !password || !password2) {
            alert("Fields can't be empty!");
            return;
        }
        if (password !== password2) {
            alert("Passwords don't match!");
            return;
        }
        User.register(name, password);
    }

    return (
        <div>
            <form action="">
                <input ref={nameInpRef} type="text" placeholder="name" />
                <br />
                <input ref={passInpRef} type="password" placeholder="password" />
                <br />
                <input ref={confPassInpRef} type="password" placeholder="confirm password" />
                <br />
                <Button onClick={handleClick}>register</Button>
            </form>
        </div>
    );
}