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
    savedImg: string
}

export const ResultTableProvider: FC<Props> = ({ children }): any => {

    const { canvasRef, cutSquareFromImage } = useCanvas();
    const [predictionResult, setPredictionResult] = useState<Array<PredictionResponse>>([{"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}]);
    const [savedResults, setSavedResult] = useState<Array<SavedResult>>([]);
    const [lastEvaluatedImage, setLastEvaluatedImage] = useState(null);
    const [reload, setReload] = useState(false);
    const handleEvaluateClick = (isHandwritten: boolean) => {

        if (isHandwritten) {
            evaluateHandwrittenCanvasSnapshot()
                .then(result => {
                    setPredictionResult(result)
                });
        } else {
            handleEvaluateAnnotationClick();
        }
    }

    const handleEvaluateAnnotationClick = () => {
        cutSquareFromImage().then((res: string) => evaluateAnnotationCanvasSnapshot(res)
            .then(result => {
                setLastEvaluatedImage(res);
                setPredictionResult(result)
            }))
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

        setLastEvaluatedImage(canvasData);

        return fetch(
            'http://127.0.0.1:5000/predict-handwritten',
            {
                method: 'post',
                body: formData
            }).then(response => response.json());
    }

    const handleSaveClick = () => {
        const table = document.getElementById('result-table-body');
        // @ts-ignore
        let inputChoiceId = Array.from(document.getElementsByName("radio1")).find(r => r.checked).id;
        let rowNumber = inputChoiceId.charAt(inputChoiceId.length - 1);
        // @ts-ignore
        const resultClass = table.rows[rowNumber].cells[1].innerText;
        // @ts-ignore
        const resultProbability = table.rows[rowNumber].cells[2].innerText;
        savedResults.push({"palmyreLetter":resultClass, "probability":resultProbability, "savedImg":lastEvaluatedImage})
        setSavedResult(savedResults);
        setReload(!reload);
        setPredictionResult([{"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}])

    }

    return (
        <ResultTableContext.Provider
            value={{
                predictionResult,
                handleEvaluateClick,
                handleEvaluateAnnotationClick,
                handleSaveClick,
                savedResults,
                lastEvaluatedImage,
                setSavedResult,
                reload
            }}>
            {children}
        </ResultTableContext.Provider>
    );
};

export const useResultTable: any = () => useContext(ResultTableContext);