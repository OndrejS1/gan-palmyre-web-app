import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import data from '../resources/data.json';
import {OptionValues, options} from "../constants/ButtonOptions";

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
                        { option === options.HANDWRITTEN && data["handwritten-tooltip"] }
                        { option === options.IMAGE_ANNOTATION_CHAR && data["photo-annotation-tooltip"] }
                        { option === options.IMAGE_AUGMENTATION && data["augmented-transcript"] }
                    </Container>
                </Alert>
            )}
        </Container>
    );
};

export default BlueContainerWithTooltip;
