import React, {ReactElement, useEffect} from 'react'
import {Button, Table, TableProps} from "react-bootstrap";
import {SavedResult, useResultTable} from "../context/ResultTableContext";
// import {useCanvas} from "../context/CanvasContext";
import {t} from "../i18n";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";

export const SavedTranscriptTable: React.FunctionComponent<TableProps> = () => {

    const { savedResults, setSavedResult, reload, palmyreUnicodeMap } = useResultTable()

    // const [ savedResults, setSavedResult ] = React.useState<SavedResult[]>([]);

    useEffect(() => {
        loadTable();
    });

    const removeSelectedResult = (index: number): void => {
        confirmDialog({
            message: 'Opravdu chce tento záznam odstranit?',
            header: 'Potvrzení smazání',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Ano',
            rejectLabel: 'Ne',
            acceptClassName: 'p-button-danger',
            accept: () => {
                // @ts-ignore
                const results = savedResults.filter(result => result !== savedResults.at(index));
                setSavedResult(results);
                loadTable();
            }
        });
    };

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
                            <Button
                                variant="outline-danger"
                                onClick={() => removeSelectedResult(index)}
                            >{t('buttons.remove')}</Button>
                        </td>
                    </tr>
                </>
            );
        })}
        </tbody>
    }

    return (
        <>
            <ConfirmDialog />

            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>{t('tables.savedTable.columns.number')}</th>
                    <th>{t('tables.savedTable.columns.imageSample')}</th>
                    <th>{t('tables.savedTable.columns.transcript')}</th>
                    <th>{t('tables.savedTable.columns.palmyreLetter')}</th>
                    <th>{t('tables.savedTable.columns.probability')}</th>
                    <th>{t('tables.savedTable.columns.action')}</th>
                </tr>
                </thead>
                {
                    loadTable()
                }
            </Table>
        </>
    );
}