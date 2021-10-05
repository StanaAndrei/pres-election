import axios from "axios";
import React from "react";
import ElectionStatsView from "../ElectionStatsView/ElectionStatsView";
import { v4 as uuidv4 } from 'uuid';
import globalVars from "../../../globalVars";

const historyURL = globalVars.API_DOMAIN + '/election-stats/history';

interface ElectionStats {
    date: string,
    id: number
}

export default function History(): React.ReactElement | null {
    const [history, setHistory] = React.useState<Array<ElectionStats> | null>(null);

    React.useEffect(() => {
        
        axios.get(historyURL).then(res => {
            setHistory(res.data);
        })//*/
    }, []);

    if (!history) {
        return null;
    }

    return (
        <div>
            <b>ELECTIONS:</b>
            <br />
            {history.map((elem: any) => {
                    return (
                        <div>
                            <ElectionStatsView key={uuidv4()} id={elem['election-nr']} date={elem['election-date']} />
                            <br />
                        </div>
                    );
                })}
        </div>
    )
}