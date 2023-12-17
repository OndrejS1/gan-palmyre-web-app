import React, { useEffect } from 'react';
import SegmentationTable from "./SegmentationTable";
import {useCanvas} from "../context/CanvasContext";

export const TranscriptResultsTable: React.FC = () => {
    const { segmentationResult } = useCanvas();

    useEffect(() => {
    }, [segmentationResult]);

    if (!segmentationResult) {
        return null;
    }

    return (
        <SegmentationTable transcript={segmentationResult.transcript} image={segmentationResult.image} />
    );
};
