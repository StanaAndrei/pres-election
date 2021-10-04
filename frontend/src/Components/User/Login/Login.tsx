import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "../User";
import Modal from "../../Modal/Modal";

export default function Login(): React.ReactElement {
    let nameInpRef = React.createRef<HTMLInputElement>();
    let passInpRef = React.createRef<HTMLInputElement>();
    const [modalShow, setModalShow] = React.useState<boolean>(false);


    React.useEffect(() => {
        //let name: string | null = window.localStorage.getItem(LOCAL_STORAGE_KEYS.NAME);
        if (User.isLoggedIn()) {
            window.location.assign('/');
        }
    }, []);

    const handleBtnClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        let { value: name } = nameInpRef.current!;
        let { value: password } = passInpRef.current!;
        let loginOK: boolean = await User.login(name, password);
        if (loginOK) {
            window.location.assign('/');
        } else {
            setModalShow(true);
        }
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
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data="LOGIN FAILED!"
            />
        </div>
    );
}