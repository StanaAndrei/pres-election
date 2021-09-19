import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import User from "../../Schemas/User";
const checkPresidentURL: string = 'http://localhost:8080/president';
const name: string | null = User.getName();
const isCandidateURL: string = `http://localhost:8080/is-candidate/${name}`;
const setCandURL: string = `http://localhost:8080/set-candidate/${name}`;

export default function Home(): React.ReactElement {
    const [status, setStatus] = React.useState<string>('');
    const [candStatus, setCandStatus] = React.useState<string>('');
    const [showCandBtn, setShowCandBtn] = React.useState<boolean>(false);

    React.useEffect(() => {
        axios.get(checkPresidentURL).then(res => {
            const {data: presName} = res;
            if (name && name === presName) {
                setStatus('You are the president!');
            } else {
                setStatus(`The president is "${presName}"!`);
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
                <h4>Current president</h4>
                {status}
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