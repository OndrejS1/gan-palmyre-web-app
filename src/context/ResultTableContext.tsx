import React, {FC, ReactNode, useContext, useState} from "react";
import {resizeCanvas} from "../utils/CanvasResizer";
import {useCanvas} from "./CanvasContext";
import {OptionValues, options} from "../constants/ButtonOptions";


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

export type SegmentationResponse = {
    image: string,
    transcript: Array<Array<string>>
}

export const ResultTableProvider: FC<Props> = ({ children }): any => {

    const { canvasRef, cutSquareFromImage, augmentedImage, setIsLoading, setSegmentationResult,segmentationResult  } = useCanvas();
    const [predictionResult, setPredictionResult] = useState<Array<PredictionResponse>>([{"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}]);
    const [savedResults, setSavedResult] = useState<Array<SavedResult>>([]);
    const [lastEvaluatedImage, setLastEvaluatedImage] = useState(null);
    const [reload, setReload] = useState(false);
    const palmyreUnicodeMap = {
        "aleph":"\uD802\uDC60",
        "beth":"\uD802\uDC61",
        "gimel":"\uD802\uDC62",
        "daleth":"\uD802\uDC63",
        "he":"\uD802\uDC64",
        "waw":"\uD802\uDC65",
        "zayin":"\uD802\uDC66",
        "heth":"\uD802\uDC67",
        "teth":"\uD802\uDC68",
        "yodh":"\uD802\uDC69",
        "kaph":"\uD802\uDC6A",
        "lamedh":"\uD802\uDC6B",
        "mem":"\uD802\uDC6C",
        "nun_final":"\uD802\uDC6D",
        "nun":"\uD802\uDC6E",
        "samekh":"\uD802\uDC6F",
        "ayin":"\uD802\uDC70",
        "pe":"\uD802\uDC71",
        "sadhe":"\uD802\uDC72",
        "qoph":"\uD802\uDC73",
        "resh":"\uD802\uDC74",
        "resh-daleth":"\uD802\uDC74",
        "shin":"\uD802\uDC75",
        "taw":"\uD802\uDC76",
        "left":"\uD802\uDC77",
        "right":"\uD802\uDC78",
        "1":"\uD802\uDC79",
        "2":"\uD802\uDC7A",
        "3":"\uD802\uDC7B",
        "4":"\uD802\uDC7C",
        "5":"\uD802\uDC7D",
        "10":"\uD802\uDC7E",
        "100":"\uD802\uDC7E",
        "20":"\uD802\uDC7F"
    };
    const handleEvaluateClick = (selectionOption: OptionValues) => {

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 150000);

        switch (selectionOption) {
            case options.IMAGE_AUGMENTATION:
                handleAugmentedTranscriptClick().then(result => {
                    setSegmentationResult(result);
                    setIsLoading(false);
                })
                break;
            case options.IMAGE_ANNOTATION:
                handleEvaluateAnnotationClick()
                setIsLoading(false);
                break;
            case options.HANDWRITTEN:
                evaluateHandwrittenCanvasSnapshot()
                    .then(result => {
                        setPredictionResult(result)
                        setIsLoading(false);
                    });
                break;
            default:
                console.log('Invalid action!');
        }
    }

    const handleEvaluateAnnotationClick = () => {
        cutSquareFromImage().then((res: string) => evaluateAnnotationCanvasSnapshot(res)
            .then(result => {
                setLastEvaluatedImage(res);
                setPredictionResult(result)
            }))
    }

    const handleAugmentedTranscriptClick = async () => {

        const formData = new FormData();
        formData.append('imageBase64', augmentedImage);

        const response = await fetch(
            'https://ml-research.pef.czu.cz/api/convert-augmented',
            {
                method: 'post',
                body: formData
            });
        return await response.json();

    }
    const evaluateAnnotationCanvasSnapshot = async (annotationResult: string) => {
        const formData = new FormData();
        formData.append('imageBase64', annotationResult);

        return fetch(
            'https://ml-research.pef.czu.cz/api/predict',
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
            'https://ml-research.pef.czu.cz/api/predict-handwritten',
            {
                method: 'post',
                body: formData
            }).then(response => response.json());
    }

    const handleSaveClick = (selectionOption: OptionValues) => {
        switch (selectionOption) {
            case options.HANDWRITTEN:
            case options.IMAGE_ANNOTATION:
                const table = document.getElementById('result-table-body');
                // @ts-ignore
                let inputChoiceId = Array.from(document.getElementsByName("radio1")).find(r => r.checked).id;
                let rowNumber = inputChoiceId.charAt(inputChoiceId.length - 1);
                // @ts-ignore
                const resultClass = table.rows[rowNumber].cells[2].innerText;
                // @ts-ignore
                const resultProbability = table.rows[rowNumber].cells[3].innerText;
                savedResults.push({"palmyreLetter":resultClass, "probability":resultProbability, "savedImg":lastEvaluatedImage})
                setSavedResult(savedResults);
                setReload(!reload);
                setPredictionResult([{"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}, {"class": " ", "probability": "", "choice": false}])
                break;
            case options.IMAGE_AUGMENTATION:
                alert("Have not been implemented yet!");
                break;
            default:
                alert("Unsupported option!");
        }
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
                reload,
                palmyreUnicodeMap,
                segmentationResult
            }}>
            {children}
        </ResultTableContext.Provider>
    );
};

export const useResultTable: any = () => useContext(ResultTableContext);