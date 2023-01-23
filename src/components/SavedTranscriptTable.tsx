import React, {ReactElement, useEffect} from 'react'
import {Table, TableProps} from "react-bootstrap";
import {SavedResult, useResultTable} from "../context/ResultTableContext";

export const SavedTranscriptTable: React.FunctionComponent<TableProps> = () => {

    const { savedResults } = useResultTable()

    useEffect(() => {
        loadTable();
    }, [savedResults]);

    function loadTable(): ReactElement {
        if(savedResults === undefined) {
            return;
        }

        return <tbody>
        { savedResults.map((prediction: SavedResult, index: number) => {
            return (
                <>
                    <tr key={index}>
                        <td key={index+1}>{index+1}</td>
                        <td key={index+2}>{prediction.palmyreLetter}</td>
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