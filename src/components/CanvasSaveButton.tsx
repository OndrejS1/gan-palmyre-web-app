import React from 'react'
import { useResultTable } from '../context/ResultTableContext'
import {Button, ButtonProps} from "react-bootstrap";


export const SaveCanvasButton: React.FunctionComponent<ButtonProps> = () => {
    const { handleSendClick } = useResultTable();

    return <Button variant="outline-success" onClick={handleSendClick}>Evaluate</Button>

}
