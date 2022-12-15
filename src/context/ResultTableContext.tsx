import React, {FC, ReactNode, useContext, useState} from "react";
import {resizeCanvas} from "../utils/CanvasResizer";
import {useCanvas} from "./CanvasContext";

const ResultTableContext = React.createContext(null);

interface Props {
    children?: ReactNode
}

export type PredictionResponse = {
    class: string,
    probability: string
}

export const ResultTableProvider: FC<Props> = ({ children }): any => {

    const { canvasRef } = useCanvas();
    const [predictionResult, setPredictionResult] = useState<Array<PredictionResponse>>([{"class": " ", "probability": ""}, {"class": " ", "probability": ""}]);

    const handleSendClick = () => {
        evaluateHandwrittenCanvasSnapshot()
            .then(result => setPredictionResult(result));
    }

    const evaluateHandwrittenCanvasSnapshot = async () => {
        const canvas = canvasRef.current;

        const resizedCanvas = resizeCanvas(canvas, 28, 28, true);
        const canvasData = resizedCanvas.toDataURL("image/png");

        const formData = new FormData();
        formData.append('imageBase64', canvasData);

        return fetch(
            'http://127.0.0.1:5000/predict-handwritten',
            {
                method: 'post',
                body: formData
            }).then(response => response.json());
    }




    return (
        <ResultTableContext.Provider
            value={{
                predictionResult,
                handleSendClick
            }}
        >
            {children}
        </ResultTableContext.Provider>
    );
};

export const useResultTable: any = () => useContext(ResultTableContext);