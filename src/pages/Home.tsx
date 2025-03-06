import { Canvas } from "../components/Canvas";
import { ClearCanvasButton } from "../components/CanvasClearButton";
import React,{useState} from "react";
import ToggleButton from "../components/ToggleButton";
import {ButtonGroup, Col, Container, Row, Table} from "react-bootstrap";
import {ResultTable} from "../components/ResultTable";
import {ResultTableProvider} from "../context/ResultTableContext";
import {CanvasEvaluateButton} from "../components/CanvasEvaluateButton";
import {SaveCanvasButton} from "../components/CanvasSaveButton";
import {SavedTranscriptTable} from "../components/SavedTranscriptTable";
import ImageAnnotation from "../components/ImageAnnotation";
import '../resources/styles/ToggleButton.scss';
import {useCanvas} from "../context/CanvasContext";
import BlueContainerWithTooltip from "../components/BlueContainerWithTooltip";
import { ReactComponent as TranscriptIcon } from '../resources/icons/transcript.svg';
import { ReactComponent as HandwrittenIcon } from '../resources/icons/handwritten.svg';
import { ReactComponent as ImageAnnotationIcon } from '../resources/icons/annotate.svg';
import {options, OptionValues} from "../constants/ButtonOptions";
import AugmentedTranscriptFileUpload from "../components/AugmentedTranscriptFileUpload";
import LoadingOverlay from "../components/LoadingOverlay";
import {TranscriptResultsTable} from "../components/TranscriptResultsTable";
import {SegmentationImageResult} from "../components/SegmentationImageResult";

function Home() {

    const [activeOption, setActiveOption] = useState<OptionValues>(options.HANDWRITTEN);
    const { setSelectedOption, isLoading, segmentationResult } = useCanvas();

    const handleHandwrittenClick = () => {
        setActiveOption(options.HANDWRITTEN);
        setSelectedOption(options.HANDWRITTEN);
    };

    const handleImageAnnotationClick = () => {
        setActiveOption(options.IMAGE_ANNOTATION);
        setSelectedOption(options.IMAGE_ANNOTATION);
    };

    const handleImageAugmentationClick = () => {
        setActiveOption(options.IMAGE_AUGMENTATION);
        setSelectedOption(options.IMAGE_AUGMENTATION);
    };

    // @ts-ignore
    return (
        <Container className="mt-5" style={{backgroundColor: '#161617'}}>
            <Row>
                <Col className="col-12">
                    <h1 className="mb-3">Palmyre Translation Tool</h1>
                    <BlueContainerWithTooltip option={activeOption} />
                </Col>

                <Col className="col-12">
                    <ButtonGroup className="button-group w-100">
                        <Row className="w-100">
                            <ToggleButton
                                active={activeOption === options.HANDWRITTEN}
                                onClick={handleHandwrittenClick}
                                icon={<HandwrittenIcon />}
                                label="Handwritten"
                            />
                            <ToggleButton
                                active={activeOption === options.IMAGE_ANNOTATION}
                                onClick={handleImageAnnotationClick}
                                icon={<ImageAnnotationIcon />}
                                label="Image Annotation"
                            />
                            <ToggleButton
                                active={activeOption === options.IMAGE_AUGMENTATION}
                                onClick={handleImageAugmentationClick}
                                icon={<TranscriptIcon />}
                                label="Segmentation & Transcript"
                            />
                        </Row>
                    </ButtonGroup>
                </Col>
            </Row>

            <ResultTableProvider>
                <LoadingOverlay isLoading={isLoading} />
                <Row>
                    <Col>
                        {activeOption === options.HANDWRITTEN && <Canvas />}
                        {activeOption === options.IMAGE_ANNOTATION && <ImageAnnotation />}

                        {activeOption === options.IMAGE_AUGMENTATION &&
                            <TranscriptResultsTable/>
                        }

                        {
                            activeOption === options.IMAGE_AUGMENTATION && <AugmentedTranscriptFileUpload />
                        }
                    </Col>
                    <Col>
                        {activeOption !== options.IMAGE_AUGMENTATION &&
                            <Table id={'resultTable'} className={'mt-5'}>
                                <ResultTable/>
                            </Table>
                        }

                         <Row>
                            <CanvasEvaluateButton/>
                            <ClearCanvasButton/>
                            <SaveCanvasButton/>
                         </Row>

                    </Col>
                </Row>
                <Row>
                    {activeOption !== options.IMAGE_AUGMENTATION &&
                        <Col>
                            <h2 className="mt-2 mb-3" style={{color: '#FFFFFF'}}>Translations</h2>
                            <SavedTranscriptTable/>
                        </Col>
                    }
                    {
                        activeOption === options.IMAGE_AUGMENTATION && segmentationResult !== null && <SegmentationImageResult />
                    }
                </Row>
            </ResultTableProvider>
        </Container>
    );
}

export default Home;
