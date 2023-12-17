import React, { useEffect} from 'react';
import {SegmentationResponse} from "../context/ResultTableContext";
import {useCanvas} from "../context/CanvasContext";

export const SegmentationImageResult: React.FC = () => {
    const { segmentationResult } = useCanvas();

    useEffect(() => {
    }, [segmentationResult]);

    if (!segmentationResult) {
        return null;
    }

    return (
        <ImageSegment image={segmentationResult.image} transcript={segmentationResult.transcript} />
    );
};

const ImageSegment: React.FC<SegmentationResponse> = ({ image , transcript}) => {
    return (
            <img src={image} alt="Segmentation" style={{height: 800, width: 600}} />
    );
};