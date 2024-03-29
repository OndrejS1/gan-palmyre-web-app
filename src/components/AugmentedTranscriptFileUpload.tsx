import {useCanvas} from "../context/CanvasContext";
import React from "react";
import {Col} from "react-bootstrap";

const AugmentedTranscriptFileUpload = () => {

    const {
        loadAugmentedImage,
        reload,
    } = useCanvas();

    const [, updateState] = React.useState();
    // @ts-ignore
    React.useCallback(() => updateState({}), [reload]);

    return (
        <Col id={"augmented-image-box"}>
            <canvas id={'segmentation-hidden-canvas'} style={{ display: 'none' }}></canvas>
            <div className="mt-5" id="fileAugmentedUploadField">
                <label htmlFor="images" className="drop-container text-center">
                    <span className="drop-title">Drop files here</span>
                    <input type="file" id="fileAugmentedInput" accept="image/*" onChange={loadAugmentedImage} />
                </label>
            </div>
        </Col>
    );
};

export default AugmentedTranscriptFileUpload;