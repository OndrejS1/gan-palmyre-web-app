import React from "react";
import {useCanvas} from "../context/CanvasContext";
import {Col} from "react-bootstrap";
import {t} from "../i18n";

type ImageAnnotationProps = {
    type: 'char' | 'sentence';
};

const ImageAnnotation: React.FC<ImageAnnotationProps> = ({type}) => {

    const {
        loadImage,
        hiddenCanvasRef,
        reload,
    } = useCanvas();

    const [, updateState] = React.useState();
    // @ts-ignore
    React.useCallback(() => updateState({}), [reload]);

    return (
        <Col id={"imageBox"}>
            <div className={"center mt-5"} id="fileUploadField">
                <label htmlFor="images" className="drop-container">
                    <span className="drop-title">{t('common.dropFilesHere')}</span>
                    <input type="file" id="fileInput" accept="image/*" onChange={loadImage} />
                </label>
            </div>
            <canvas className={"mt-3"} id="canvas"></canvas>
            <canvas ref={hiddenCanvasRef} className="d-none"></canvas>
       </Col>
    );
};

export default ImageAnnotation;
