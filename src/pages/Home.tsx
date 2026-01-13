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
import {t} from "../i18n";

function Home() {

    const [activeOption, setActiveOption] = useState<OptionValues>(options.HANDWRITTEN);
    const { setSelectedOption, isLoading, segmentationResult } = useCanvas();

    const handleHandwrittenClick = () => {
        setActiveOption(options.HANDWRITTEN);
        setSelectedOption(options.HANDWRITTEN);
    };

    const handleImageAnnotationCharClick = () => {
        setActiveOption(options.IMAGE_ANNOTATION_CHAR);
        setSelectedOption(options.IMAGE_ANNOTATION_CHAR);
    };

    const handleImageAnnotationSentencesClick = () => {
        setActiveOption(options.IMAGE_ANNOTATION_SENTENCES);
        setSelectedOption(options.IMAGE_ANNOTATION_SENTENCES);
    };

    const handleImageAugmentationClick = () => {
        setActiveOption(options.IMAGE_AUGMENTATION);
        setSelectedOption(options.IMAGE_AUGMENTATION);
    };

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col className="col-12">
                        <h1 className="mb-3 headline-1">{t('headline.main')}</h1>
                        <BlueContainerWithTooltip option={activeOption} />
                    </Col>

                    <Col className="col-12">
                        <ButtonGroup className="button-group w-100">
                            <Row className="w-100">
                                <ToggleButton
                                    active={activeOption === options.HANDWRITTEN}
                                    onClick={handleHandwrittenClick}
                                    icon={<HandwrittenIcon />}
                                    label={t('buttons.handwritten')}
                                />

                                <ToggleButton
                                    active={activeOption === options.IMAGE_ANNOTATION_CHAR}
                                    onClick={handleImageAnnotationCharClick}
                                    icon={<ImageAnnotationIcon />}
                                    label={t('buttons.imageAnnotationChar')}
                                />

                                <ToggleButton
                                    active={activeOption === options.IMAGE_ANNOTATION_SENTENCES}
                                    onClick={handleImageAnnotationSentencesClick}
                                    icon={<ImageAnnotationIcon />}
                                    label={t('buttons.imageAnnotationSentences')}
                                />

                                <ToggleButton
                                    active={activeOption === options.IMAGE_AUGMENTATION}
                                    onClick={handleImageAugmentationClick}
                                    icon={<TranscriptIcon />}
                                    label={t('buttons.segmentationAndTranscript')}
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
                            {activeOption === options.IMAGE_ANNOTATION_CHAR && <ImageAnnotation />}

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
                                <h2 className="mt-2 mb-3 headline-2">{t('headline.translations')}</h2>
                                <SavedTranscriptTable/>
                            </Col>
                        }
                        {
                            activeOption === options.IMAGE_AUGMENTATION && segmentationResult !== null && <SegmentationImageResult />
                        }
                    </Row>
                </ResultTableProvider>
            </Container>
        </>
    );
}

export default Home;