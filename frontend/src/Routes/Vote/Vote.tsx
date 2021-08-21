import axios from "axios";
import React from "react";
import CandidateView from "../../Components/CandidateView/CandidateView";
import User from "../../Schemas/User";
import { v4 as uuidv4 } from 'uuid';
const candidatesURL: string = "http://localhost:8080/candidates";
const checkVoteURL: string = `http://localhost:8080/check-vote/${User.getName()}`;

export default function Vote(): React.ReactElement | null {
    const [hasVoted, setHasVoted] = React.useState<boolean | null>(null);
    const [candidates, setCandidates] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        axios.get(checkVoteURL).then(res => {
            setHasVoted(res.data);
        }, err => {
            console.error((err));
            alert('smth went wrong!');
        })
    }, []);

    React.useEffect(() => {
        if (!User.isLoggedIn()) {
            window.location.assign('/');
            return;
        }

        axios.get(candidatesURL).then(res => {
            setCandidates(res.data);
        }, err => {
            console.error(err);
            alert("Couldn't fetch candidate list!");
        })
    }, []);

    if (hasVoted) {
        window.location.assign('/');
    }

    if (!candidates.length) {
        return null;
    }

    return (
        <div>
            {
                candidates.map(candidate => <CandidateView key={uuidv4()} name={candidate} />)
            }
        </div>
    );
}