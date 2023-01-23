import React from 'react'
import { useResultTable } from '../context/ResultTableContext'
import {Button, ButtonProps} from "react-bootstrap";


export const SaveCanvasButton: React.FunctionComponent<ButtonProps> = () => {
    const { handleSaveClick } = useResultTable();

    return <Button className="mt-3" variant="outline-info" onClick={handleSaveClick}>Save</Button>

}
