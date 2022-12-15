import React, {ReactElement, useEffect} from 'react'
import {Table, TableProps} from "react-bootstrap";
import {PredictionResponse, useResultTable} from "../context/ResultTableContext";

export const ResultTable: React.FunctionComponent<TableProps> = () => {

    const { predictionResult } = useResultTable()

    useEffect(() => {
        loadTable();
    }, [predictionResult]);

    function loadTable(): ReactElement {
        if(predictionResult === undefined) {
            return;
        }

        return <tbody>
                { predictionResult.map((prediction: PredictionResponse, index: number) => {
                    return (
                        <>
                            <tr key={index}>
                                <td key={index+1}>{index+1}</td>
                                <td key={index+2}>{prediction.class}</td>
                                <td key={index+3}>{prediction.probability}</td>
                            </tr>
                        </>
                    );
                })}
            </tbody>
    }

    return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Palmyre letter</th>
                    <th>Probability</th>
                </tr>
                </thead>
                {
                    loadTable()
                }
            </Table>
    );
}