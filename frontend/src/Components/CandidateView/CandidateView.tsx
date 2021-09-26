import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import globalVars from "../../globalVars";
import User from "../../Schemas/User";
import "./CandidateView.css";

interface CandidateData {
    name: string
}

export default function CandidateView({name}: CandidateData): React.ReactElement {
    const addVoteURL: string = globalVars.API_DOMAIN + '/vote/add-vote';

    const handleVoteBtnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        axios.put(addVoteURL, {
            votedUser: name,
            userWhoVoted: User.getName()
        }).then(res => {
            window.location.assign('/');
        }, err => {
            console.error(err);
            alert('failed to add vote!');
        })
    }

    return (
        <div className="candidate-view">
            {name}
            <br />
            <Button onClick={handleVoteBtnClick} variant="info">VOTE!</Button>
        </div>
    );
}