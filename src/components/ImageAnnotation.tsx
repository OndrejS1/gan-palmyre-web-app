import React, {useEffect, useState} from "react";
import {useCanvas} from "../context/CanvasContext";
import {Col} from "react-bootstrap";

const ImageAnnotation = () => {
    const {
        loadImage,
        reload
    } = useCanvas();

    const [, updateState] = React.useState();
    // @ts-ignore
    React.useCallback(() => updateState({}), [reload]);
    console.log("render");



    return (
        <Col id={"imageBox"}>
            <div className={"center mt-5"} id="fileUploadField">
                <label htmlFor="images" className="drop-container">
                    <span className="drop-title">Drop files here</span>
                    <input type="file" id="fileInput" accept="image/*" onChange={loadImage} />
                </label>
            </div>
            <canvas id="canvas"></canvas>
       </Col>
    );
};

export default ImageAnnotation;
