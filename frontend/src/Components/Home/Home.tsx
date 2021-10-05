import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import PresidentView from "../Election/PresidentView/PresidentView";
import globalVars from "../../globalVars";
import User from "../User/User";
const checkPresidentURL: string = globalVars.API_DOMAIN + '/vote/president';
const name: string | null = User.getName();
const isCandidateURL: string = globalVars.API_DOMAIN + `/election/${name}/is-candidate`;
const setCandURL: string = globalVars.API_DOMAIN + `/election/${name}/set-candidate`;

export default function Home(): React.ReactElement {
    const [status, setStatus] = React.useState<string>('');
    const [candStatus, setCandStatus] = React.useState<string>('');
    const [showCandBtn, setShowCandBtn] = React.useState<boolean>(false);

    React.useEffect(() => {
        axios.get(checkPresidentURL).then(res => {
            const {data: presName} = res;
            if (name && name === presName) {
                setStatus('you!');
            } else {
                setStatus(`${presName}`);
            }
        }, err => {
            console.error(err);
            setStatus('Server is down!');
        })
    }, []);

    React.useEffect(() => {        
        axios.get(isCandidateURL).then(res => {
            if (res.data) {                
                setCandStatus('You are candidating!');
            } else {                
                setCandStatus('You are not candidating!');
            }
            setShowCandBtn(!res.data);
        }, err => {
            console.error(err);
            if (!name) {
                setCandStatus('Login to know!');
                setShowCandBtn(false);
                return;
            }
            setCandStatus('server is down!');
        })//*/
    }, []);

    const handleCandBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        axios.put(setCandURL).then(res => {
            window.location.reload();
        }, err => {
            console.error(err);
            setCandStatus('process failed!');
        })
    }

    return (
        <div>
            WELCOME!
            <br />
            With this app you can vote presidents or become one.
            You can vote once.
            <br />
            <br />
            <br />
            <hr />
            <div id="status">
                <PresidentView winner={status} />
            </div>
            <hr />
            <div id="candidate-status-area">
                <h4>Your candidate status!</h4>
                {candStatus}
                <br />
                {showCandBtn && <Button onClick={handleCandBtnClick} variant="danger">CANDIDATE!</Button>}
            </div>
            <hr />
        </div>
    );
}