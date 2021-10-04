import axios from "axios";
import React from "react";
import CandidateView from "../CandidateView/CandidateView";
import User from "../User/User";
import { v4 as uuidv4 } from 'uuid';
import globalVars from "../../globalVars";
const candidatesURL: string = globalVars.API_DOMAIN + "/election/candidates";
const checkVoteURL: string = globalVars.API_DOMAIN + `/vote/${User.getName()}/check-vote`;

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