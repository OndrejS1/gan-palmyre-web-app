import { Canvas } from "../components/Canvas";
import { ClearCanvasButton } from "../components/CanvasClearButton";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {ResultTable} from "../components/ResultTable";
import {ResultTableProvider} from "../context/ResultTableContext";
import {SaveCanvasButton} from "../components/CanvasSaveButton";

function Home() {
    return (
        <Container>
            <h1> Palmyre Drawing Pad</h1>
            <Row>
                <Col>
                    <Canvas  />
                </Col>
                <Col>
                    <ResultTableProvider>
                         <ResultTable/>
                         <Row>
                            <SaveCanvasButton/>
                            <ClearCanvasButton/>
                         </Row>
                    </ResultTableProvider>
                </Col>
            </Row>
        </Container>
);
}

export default Home;