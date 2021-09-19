import React from "react";
import "./Header.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import User from "../../Schemas/User";

interface AnchorData {
    href: string,
    value: string
}

export default function Header(): React.ReactElement {
    const [displayLOBtn] = React.useState<boolean>(() => {
        return User.isLoggedIn();
    });//*/
    const [anchorData] = React.useState<AnchorData>(() => {
        const name: string | null = window.localStorage.getItem(LOCAL_STORAGE_KEYS.NAME);
        if (name) {
            return {
                href: '',
                value: name
            };
        }
        return {
            href: '/login',
            value: 'login'
        };
    });

    const logOutBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        User.logOut();
        window.location.reload();
    }

    return (
        <header>
            <h2>Presidential election</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    menu
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/">home</Dropdown.Item>
                                    <Dropdown.Item href="/vote">vote</Dropdown.Item>
                                    <Dropdown.Item href="/history">history</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                        <td id="user-log">
                            <a href={anchorData.href}
                            >
                                {anchorData.value}
                            </a>
                            <Button onClick={logOutBtnClick} id="logout" style={{ display: displayLOBtn ? 'inline' : 'none' }} >log-out</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </header>
    );
}