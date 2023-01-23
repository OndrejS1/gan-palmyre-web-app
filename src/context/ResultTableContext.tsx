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
    choice: boolean
}

export type SavedResult = {
    palmyreLetter: string,
    probability: string
}

export const ResultTableProvider: FC<Props> = ({ children }): any => {

    const { canvasRef, cutSquareFromImage } = useCanvas();
    const [predictionResult, setPredictionResult] = useState<Array<PredictionResponse>>([{"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}]);
    const [savedResults, setSavedResult] = useState<Array<SavedResult>>([{"palmyreLetter": " ", "probability": ""}, {"palmyreLetter": " ", "probability": ""}]);
    const handleEvaluateClick = (isHandwritten: boolean) => {
        console.log(isHandwritten)

        if (isHandwritten) {
            evaluateHandwrittenCanvasSnapshot()
                .then(result => setPredictionResult(result));
        } else {
            handleEvaluateAnnotationClick();
        }
    }

    const handleEvaluateAnnotationClick = () => {
        cutSquareFromImage().then((res: string) => evaluateAnnotationCanvasSnapshot(res)
            .then(result => setPredictionResult(result)))
    }

    const evaluateAnnotationCanvasSnapshot = async (annotationResult: string) => {
        const formData = new FormData();
        formData.append('imageBase64', annotationResult);

        return fetch(
            'http://127.0.0.1:5000/predict',
            {
                method: 'post',
                body: formData
            }).then(response => response.json());
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
                handleEvaluateClick,
                handleEvaluateAnnotationClick
            }}>
            {children}
        </ResultTableContext.Provider>
    );
};

export const useResultTable: any = () => useContext(ResultTableContext);