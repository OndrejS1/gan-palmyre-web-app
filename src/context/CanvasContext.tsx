import React, {FC, ReactNode, useContext, useRef, useState} from "react";
import placeholderImage from '../resources/image/placeholder-palmyre.png';

const CanvasContext = React.createContext(null);

interface Props {
    children?: ReactNode
}

export const CanvasProvider: FC<Props> = ({ children }): any => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [count, setCount] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const prepareCanvas = () => {

        const canvas = canvasRef.current
        canvas.width = 500 * 2;
        canvas.height = 500 * 2;

        canvas.style.width = `500px`;
        canvas.style.height = `500px`;

        const context = canvas.getContext("2d")

        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 15;

        const image = new Image();
        image.src = placeholderImage;
        image.onload = () => {
            context.drawImage(image, 0, 0, 500, 500);
        };

        contextRef.current = context;
    };

    // @ts-ignore
    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);

        setIsDrawing(true);
    };

    const finishDrawing = (): void => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }: any) => {
        if(count > 0 && count < 2) {
            clearPlaceholder();
        }

        if (!isDrawing) {
            return;
        }
        setCount(count+1)
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const clearCanvas = (): void => {
        prepareCanvas();
        setCount(0);
    }

    const clearPlaceholder = (): void => {
        const context = canvasRef.current.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                clearCanvas,
                draw
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas: any = () => useContext(CanvasContext);