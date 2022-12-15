import React from 'react'
import { useCanvas } from './CanvasContext'

export const ClearCanvasButton: React.FunctionComponent<any> = () => {
    const { clearCanvas } = useCanvas()

    return <button onClick={clearCanvas}>Clear canvas</button>
}