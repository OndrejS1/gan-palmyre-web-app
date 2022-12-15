import React from 'react'
import { useCanvas } from '../context/CanvasContext'
import {Button, ButtonProps} from "react-bootstrap";

export const ClearCanvasButton: React.FunctionComponent<ButtonProps> = () => {
    const { clearCanvas } = useCanvas()

    return <Button variant="outline-warning" onClick={clearCanvas}>Reset</Button>
}