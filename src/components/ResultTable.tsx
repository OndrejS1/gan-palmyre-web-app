import React, {ReactElement, useEffect} from 'react'
import {Table, TableProps} from "react-bootstrap";
import {PredictionResponse, useResultTable} from "../context/ResultTableContext";

export const ResultTable: React.FunctionComponent<TableProps> = () => {

    const {predictionResult, savedResults, setSavedResult, lastEvaluatedImage} = useResultTable()

    useEffect(() => {
        loadTable();
    }, [predictionResult]);

    const saveResult = () => {

    }

    function loadTable(): ReactElement {
        if(predictionResult === undefined) {
            return;
        }

        return <tbody id={"result-table-body"}>
                { predictionResult.map((prediction: PredictionResponse, index: number) => {
                    return (
                        <>
                            <tr key={index} id={"row" + index+1}>
                                <td key={index+1}>{index+1}</td>
                                <td key={prediction.class}>{prediction.class}</td>
                                <td key={prediction.probability}>{prediction.probability}</td>
                                <td key={index+100}><input type="radio" key={index} id={"inputchoice"+index} name="radio1" onClick={() => saveResult()}/></td>
                            </tr>
                        </>
                    );
                })}
            </tbody>
    }

    return (
            <Table striped bordered hover variant="dark" id={"resultTable2"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Palmyre letter</th>
                    <th>Probability</th>
                    <th>Choice</th>
                </tr>
                </thead>
                {
                    loadTable()
                }
            </Table>
    );
}