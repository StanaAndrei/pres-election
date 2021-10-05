import React from "react";
import { Figure } from "react-bootstrap";
import { ELECTION_RESULT_IMG } from "../../../constants";
import "./PresidentView.css";

export default function PresidentView({winner}: any): React.ReactElement {
    console.log(winner);
    return (
        <div className='pres-view'>
            <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={ELECTION_RESULT_IMG}
                />
                <Figure.Caption>
                    <div id="winner">{winner}</div>
                </Figure.Caption>
            </Figure>
        </div>
    )
}