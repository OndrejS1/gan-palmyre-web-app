import React, {ReactElement, useEffect} from 'react'
import {Table, TableProps} from "react-bootstrap";
import {PredictionResponse, useResultTable} from "../context/ResultTableContext";

export const ResultTable: React.FunctionComponent<TableProps> = () => {

    const { predictionResult } = useResultTable()

    useEffect(() => {
        loadTable();
    }, [predictionResult]);

    const saveResult = (e: any) =>{
      //  const table: HTMLElement = document.querySelector("");

        var tds = document.querySelectorAll('#resultTable > table > tbody'), i;
        for(i = 0; i < tds.length; ++i) {
            console.log(tds[i])
        }
    }

    function loadTable(): ReactElement {
        if(predictionResult === undefined) {
            return;
        }

        return <tbody>
                { predictionResult.map((prediction: PredictionResponse, index: number) => {
                    return (
                        <>
                            <tr key={index}>
                                <td key={index}>{index}</td>
                                <td key={index}>{prediction.class}</td>
                                <td key={index}>{prediction.probability}</td>
                                <td key={index}><input type="radio" key={index} name="radio1" onChange={saveResult}/></td>
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
                    <th>Choice</th>
                </tr>
                </thead>
                {
                    loadTable()
                }
            </Table>
    );
}