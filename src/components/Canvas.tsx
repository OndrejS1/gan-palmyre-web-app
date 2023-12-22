import React, { useEffect } from "react";
import { useCanvas } from "../context/CanvasContext";
import {Col} from "react-bootstrap";

export function Canvas() {
    const {
        canvasRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        draw
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return (
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
            <canvas
                id={'canvas'}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </Col>
    );
}