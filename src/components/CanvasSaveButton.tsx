import React from 'react'
import { useResultTable } from '../context/ResultTableContext'
import {Button, ButtonProps} from "react-bootstrap";
import {useCanvas} from "../context/CanvasContext";


export const SaveCanvasButton: React.FunctionComponent<ButtonProps> = () => {
    const { handleSaveClick } = useResultTable();
    const { selectedOption } = useCanvas();


    return <Button className="mt-3" variant="outline-info" onClick={() => handleSaveClick(selectedOption)}>Save</Button>

}
