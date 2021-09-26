import React from "react";
import { Figure } from "react-bootstrap";
import { ELE_RES_IMG } from "../../constants";
import "./PresView.css";

export default function PresView({winner}: any): React.ReactElement {
    console.log(winner);
    return (
        <div className='pres-view'>
            <Figure>
                <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src={ELE_RES_IMG}
                />
                <Figure.Caption>
                    <div id="winner">{winner}</div>
                </Figure.Caption>
            </Figure>
        </div>
    )
}