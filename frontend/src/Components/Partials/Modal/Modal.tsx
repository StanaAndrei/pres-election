import React from "react";
import { Modal as BSModal } from "react-bootstrap";

export default function Modal(props: any): React.ReactElement {
    return (
        <BSModal
            {...props}
            size="lg"
            aria-labelledby="contained-BSModal-title-vcenter"
            centered
        >
            <BSModal.Header closeButton>⚠️</BSModal.Header>
            <BSModal.Body>
                <p>
                    {props.data}
                </p>
            </BSModal.Body>
            <BSModal.Footer>
            </BSModal.Footer>
        </BSModal>
    );
}