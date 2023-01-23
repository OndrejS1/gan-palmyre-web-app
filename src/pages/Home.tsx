import { Canvas } from "../components/Canvas";
import { ClearCanvasButton } from "../components/CanvasClearButton";
import React, {useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {ResultTable} from "../components/ResultTable";
import {ResultTableProvider, useResultTable} from "../context/ResultTableContext";
import {CanvasEvaluateButton} from "../components/CanvasEvaluateButton";
import {SaveCanvasButton} from "../components/CanvasSaveButton";
import {SavedTranscriptTable} from "../components/SavedTranscriptTable";
import ImageAnnotation from "../components/ImageAnnotation";
import './../resources/styles/ToggleButton.css';
import {useCanvas} from "../context/CanvasContext";

function Home() {

    const [isHandwritten, setIsHandwritten] = useState(false);
    const { setHandwritten } = useCanvas();
    const handleToggle = () => {
        setIsHandwritten(!isHandwritten);
        setHandwritten(!isHandwritten);
    };

    // @ts-ignore
    return (
        <Container className="mt-5">
            <h1 className="mb-5"> Palmyre Drawing Pad</h1>
            <ResultTableProvider>

                <Row>
                    <Button className={`toggle-button ${isHandwritten ? 'active' : ''}`} onClick={handleToggle}>
                        {isHandwritten ? 'Handwritten' : 'Image Annotation'}
                    </Button>
                </Row>
                <Row>
                        {isHandwritten ? <Canvas /> : <ImageAnnotation />}
                    <Col>
                        <Table id={'resultTable'}>
                            <ResultTable/>
                        </Table>
                         <Row>
                            <CanvasEvaluateButton/>
                            <ClearCanvasButton/>
                            <SaveCanvasButton/>
                         </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Saved Choices</h2>
                        <SavedTranscriptTable/>
                    </Col>

                </Row>
            </ResultTableProvider>
        </Container>
);
}

export default Home;