import React, {useState} from 'react'
import { useResultTable } from '../context/ResultTableContext'
import {Button, ButtonProps} from "react-bootstrap";
import {useCanvas} from "../context/CanvasContext";

/*interface Props {
    handwritten: boolean
}*/

export const CanvasEvaluateButton: React.FunctionComponent<ButtonProps> = () => {
    const { handleEvaluateClick } = useResultTable();
    const { handwritten } = useCanvas();

    return <Button className="mt-3" variant="outline-success" onClick={() => handleEvaluateClick(handwritten)}>Evaluate</Button>

}
