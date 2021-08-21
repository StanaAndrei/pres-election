import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import User from "../../Schemas/User";
import "./CandidateView.css";

interface CandidateData {
    name: string
}

export default function CandidateView({name}: CandidateData): React.ReactElement {
    const addVoteURL: string = `http://localhost:8080/add-vote/${name}`;
    const setHasVotedURL: string = `http://localhost:8080/set-voted/${User.getName()}`;

    const handleVoteBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        axios.put(addVoteURL).then(res => {
            window.location.assign('/');
        }, err => {
            console.error(err);
            alert('failed to add vote!');
        })

        axios.put(setHasVotedURL).then(res => {
            //ok
        }, err => {
            console.error(err);
            alert('smth went wrong!');
        });
    }

    return (
        <div className="candidate-view">
            {name}
            <br />
            <Button onClick={handleVoteBtnClick} variant="info">VOTE!</Button>
        </div>
    );
}