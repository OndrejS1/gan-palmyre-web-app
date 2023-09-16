import React, {ReactElement, useEffect} from 'react'
import {Table, TableProps} from "react-bootstrap";
import {PredictionResponse, useResultTable} from "../context/ResultTableContext";

export const ResultTable: React.FunctionComponent<TableProps> = () => {

    const {predictionResult, palmyreUnicodeMap} = useResultTable()

    useEffect(() => {
        loadTable();
    }, [predictionResult]);

    const saveResult = () => {

    }

    function loadTable(): ReactElement {
        if(predictionResult === undefined) {
            return;
        }

        return <tbody id="result-table-body">
            {predictionResult.map((prediction: PredictionResponse, index: number) => (
                <tr key={"row" + index}>
                    <td>{index + 1}</td>
                    <td style={{ fontSize: "32px", fontFamily: "Noto Sans Palmyrene" }}>
                        {palmyreUnicodeMap[prediction.class]}
                    </td>
                    <td>{prediction.class}</td>
                    <td>{prediction.probability}</td>
                    <td>
                        <input
                            type="radio"
                            id={"inputchoice" + index}
                            name="radio1"
                            onClick={() => saveResult()}
                        />
                    </td>
                </tr>
        ))}
        </tbody>
    }

    return (
            <Table striped bordered hover variant="dark" id={"resultTable2"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Transcript</th>
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