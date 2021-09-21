import axios from "axios";
import React from "react";
import Modal from "../../Components/Modal/Modal";
import globalVars from "../../globalVars";
const winSrc: string = window.location.search;
const eleStatsURL = globalVars.API_DOMAIN + '/election-stats' + winSrc;

export default function ElectionStats(): React.ReactElement {
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [date, setDate] = React.useState<string>('');
    const [votePresence, setVotePresence] = React.useState<number>();
    const [voteDis, setVoteDis] = React.useState<string>('');

    React.useEffect(() => {
        let aux = '';
        const params: any = new URLSearchParams(winSrc);
        for (const param of params) {
            aux += param[0] + ':' + param[1] + ' ';
        }
        setDate(aux);
    }, []);

    React.useEffect(() => {
        axios.get(eleStatsURL).then(res => {
            const { data } = res;
            setVotePresence(data['votes-percent(%)']);
            const localVoteDis = data['vote-distribution(%)'];
            let auxStr = '';
            for (const key in localVoteDis) {
                auxStr += key + ':  ' + localVoteDis[key] + ',';
            }
            auxStr = auxStr.slice(0, -1);
            setVoteDis(auxStr);
        }, err => {
            console.error(err);
            setModalShow(true);
        })
    }, []);

    return (
        <div>
            <h2>ELECTION STATS</h2>
            <p>date: <br /> {date}</p>
            <br />
            <br />
            <hr />
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data="smth went wrong!"
            />
            <h3 style={{textDecoration: 'underline'}}>stats:</h3>
            <p>vote-presence: {votePresence}%</p>
            <h4>votes-distribution:</h4>
            {voteDis.split(',').map(e => {
                return <h6>{e}%</h6>;
            })}
            <br />
        </div>
    )
}