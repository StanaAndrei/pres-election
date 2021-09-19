import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "../../Schemas/User";
import Modal from "../../Components/Modal/Modal";

export default function Register(): React.ReactElement {
    let nameInpRef = React.createRef<HTMLInputElement>();
    let passInpRef = React.createRef<HTMLInputElement>();
    let confPassInpRef = React.createRef<HTMLInputElement>();
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [modalData, setModalData] = React.useState<string>('');

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        let { value: name } = nameInpRef.current!;
        let { value: password } = passInpRef.current!;
        let { value: password2 } = confPassInpRef.current!;
        if (!name || !password || !password2) {
            renderModal("Fields can't be empty!");
            return;
        }
        if (password !== password2) {
            renderModal("Passwords don't match!");
            return;
        }
        let registerOK: boolean = await User.register(name, password);
        if (registerOK) {
            window.location.assign('/login');
        } else {    
            renderModal('REGISTER FAILED!');
        }
    }

    const renderModal = (modalData: string): void => {
        setModalData(modalData);
        setModalShow(true);
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
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={modalData}
                />
            </form>
        </div>
    );
}