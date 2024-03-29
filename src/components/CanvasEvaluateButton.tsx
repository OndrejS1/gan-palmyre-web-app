import React from 'react'
import { useResultTable } from '../context/ResultTableContext'
import {Button, ButtonProps} from "react-bootstrap";
import {useCanvas} from "../context/CanvasContext";

export const CanvasEvaluateButton: React.FunctionComponent<ButtonProps> = () => {
    const { handleEvaluateClick } = useResultTable();
    const { selectedOption } = useCanvas();

    return <Button className="mt-3" variant="outline-success" onClick={() => handleEvaluateClick(selectedOption)}>Evaluate</Button>
}
