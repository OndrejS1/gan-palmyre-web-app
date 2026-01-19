import React, {ReactElement, useEffect} from 'react'
import {Button, Table, TableProps} from "react-bootstrap";
import {SavedResult, useResultTable} from "../context/ResultTableContext";
import {useCanvas} from "../context/CanvasContext";

export const SavedTranscriptTable: React.FunctionComponent<TableProps> = () => {

    const { savedResults, setSavedResult, reload, palmyreUnicodeMap } = useResultTable()
    const { selectedOption } = useCanvas();

    useEffect(() => {
        loadTable();
    }, [savedResults, reload]);

    const removeSelectedResult = (index: number): void => {
        // @ts-ignore
        const results = savedResults.filter(result => result !== savedResults.at(index));
        setSavedResult(results);
        loadTable();
    }

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
                        <td key={prediction.palmyreLetter+2}>
                            <img width={100} height={100} src={prediction.savedImg}  alt={"Image sample"}/>
                        </td>
                        <td key={prediction.palmyreLetter+1} style={{fontSize: "100px", fontFamily: "Noto Sans Palmyrene"}}>
                            {
                                palmyreUnicodeMap[prediction.palmyreLetter]
                            }
                        </td>
                        <td key={prediction.palmyreLetter+3}>{prediction.palmyreLetter}</td>
                        <td key={prediction.palmyreLetter+4}>{prediction.probability}</td>
                        <td>
                            <Button variant="outline-danger" onClick={() => removeSelectedResult(index)}>Remove</Button>
                        </td>
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
                <th>Image Sample</th>
                <th>Transcript</th>
                <th>Palmyre letter</th>
                <th>Probability</th>
                <th>Action</th>
            </tr>
            </thead>
            {
                loadTable()
            }
        </Table>
    );
}