import React, { useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import data from '../resources/data.json';

type ModalProps = {
    isHandwritten: boolean;
};

const BlueContainerWithTooltip: React.FC<ModalProps> = ({ isHandwritten }) => {
    const [showAlert, setShowAlert] = useState(true);

    const handleCloseAlert = () => setShowAlert(false);

    return (
        <Container>
            {showAlert && (
                <Alert variant="info" onClose={handleCloseAlert} dismissible>
                    <Container>
                        { isHandwritten ? data["handwritten-tooltip"] : data["photo-annotation-tooltip"]}
                    </Container>
                </Alert>
            )}
        </Container>
    );
};

export default BlueContainerWithTooltip;
