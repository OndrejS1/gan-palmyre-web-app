import React from 'react'
import { useCanvas } from '../context/CanvasContext'
import {Button, ButtonProps} from "react-bootstrap";
import {t} from "../i18n";

export const ClearCanvasButton: React.FunctionComponent<ButtonProps> = () => {
    const { clearCanvas } = useCanvas()

    return <Button className="mt-3" variant="outline-warning" onClick={clearCanvas}>{t('buttons.reset')}</Button>
}