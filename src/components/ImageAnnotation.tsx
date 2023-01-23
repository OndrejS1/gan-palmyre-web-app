import React from "react";
import {useCanvas} from "../context/CanvasContext";
import {Col} from "react-bootstrap";

const ImageAnnotation = () => {
    const {
        loadImage
    } = useCanvas();

    return (
        <Col>
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
