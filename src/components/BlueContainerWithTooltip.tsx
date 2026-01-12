import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import {OptionValues, options} from "../constants/ButtonOptions";
import {t} from "../i18n";

type ModalProps = {
    option: OptionValues;
};

const BlueContainerWithTooltip: React.FC<ModalProps> = ({ option }) => {
    const [showAlert, setShowAlert] = useState(true);

    const handleCloseAlert = () => setShowAlert(false);

    return (
        <Container>
            {showAlert && (
                <Alert variant="info" onClose={handleCloseAlert} dismissible>
                    <Container>
                        { option === options.HANDWRITTEN && t('messages.handwritten') }
                        { option === options.IMAGE_ANNOTATION_CHAR && t('messages.imageAnnotationChar') }
                        { option === options.IMAGE_ANNOTATION_SENTENCES && t('messages.imageAnnotationSentences') }
                        { option === options.IMAGE_AUGMENTATION && t('messages.augmentedTranscript') }
                    </Container>
                </Alert>
            )}
        </Container>
    );
};

export default BlueContainerWithTooltip;
