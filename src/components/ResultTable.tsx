import React, {ReactElement, useEffect} from 'react'
import {Table, TableProps} from "react-bootstrap";
import {PredictionResponse, useResultTable} from "../context/ResultTableContext";
import {t} from "../i18n";

export const ResultTable: React.FunctionComponent<TableProps> = () => {

    const {predictionResult, palmyreUnicodeMap} = useResultTable()

    useEffect(() => {
        loadTable();
    }, [predictionResult]);

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
                        />
                    </td>
                </tr>
        ))}
        </tbody>
    }

    return (
        <div className="table-responsive">
            <Table striped bordered hover variant="dark" id="resultTable2">
                <thead>
                    <tr>
                        <th>{t('tables.evaluateTable.columns.number')}</th>
                        <th>{t('tables.evaluateTable.columns.transcript')}</th>
                        <th>{t('tables.evaluateTable.columns.palmyreLetter')}</th>
                        <th>{t('tables.evaluateTable.columns.probability')}</th>
                        <th>{t('tables.evaluateTable.columns.choice')}</th>
                    </tr>
                </thead>
                {
                    loadTable()
                }
            </Table>
        </div>
    );
}
