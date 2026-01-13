import {SegmentationResponse} from "../context/ResultTableContext";
import React from "react";
import { Table } from "react-bootstrap";
import {t} from "../i18n";

const SegmentationTable: React.FC<SegmentationResponse> = ({ transcript, image }) => {
    return (
        <div>
            <h2 className="my-5 headline-2">{t('headline.imageSegmentationResult')}</h2>
            <Table striped bordered hover variant="dark" style={{marginTop: 10}}>
                <tbody>
                {transcript.map((row, rowIndex) => (
                    <tr key={rowIndex} >
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className={'col-md-1'}>{cell}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SegmentationTable;