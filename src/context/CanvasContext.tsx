import React, {FC, ReactNode, useContext, useRef, useState} from "react";
import placeholderImage from '../resources/image/placeholder-palmyre.png';

const CanvasContext = React.createContext(null);

interface Props {
    children?: ReactNode
}

export const CanvasProvider: FC<Props> = ({ children }): any => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [count, setCount] = useState(0);
    const [handwritten, setHandwritten] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    let square:any = {};
    const annotation:any = {};
    let canvas:any, context:any, image: HTMLImageElement;

    const startAnnotation = (e: MouseEvent) => {
        // @ts-ignore
        annotation.startX = e.clientX - canvas.offsetLeft;
        // @ts-ignore
        annotation.startY = e.clientY - canvas.offsetTop;

        // @ts-ignore
        canvas.addEventListener("mousemove", drawAnnotation);
    };

    const drawAnnotation = (e: MouseEvent) => {
        context.strokeStyle = "red";

        // @ts-ignore
        context.clearRect(0, 0, image, canvas.width, canvas.height);
        // @ts-ignore
        context.drawImage(image, 0, 0, image.width, image.height);
        // @ts-ignore
        annotation.endX = e.clientX - canvas.offsetLeft;
        // @ts-ignore
        annotation.endY = e.clientY - canvas.offsetTop;

        // @ts-ignore
        const width = annotation.endX - annotation.startX;
        // @ts-ignore
        const height = annotation.endY - annotation.startY;

        if(width > height){
            // @ts-ignore
            context.strokeRect(annotation.startX, annotation.startY, height, height);
        }
        else{
            // @ts-ignore
            context.strokeRect(annotation.startX, annotation.startY, width, width);
        }
        square = { x: annotation.startX, y: annotation.startY, size: height }
    };

    const endAnnotation = (e: MouseEvent) => {
        // @ts-ignore
        const width = annotation.endX - annotation.startX;
        // @ts-ignore
        const height = annotation.endY - annotation.startY;

        if(width > height){
            square = {
                // @ts-ignore
                x: annotation.startX,
                // @ts-ignore
                y: annotation.startY,
                size: height
            };
        } else {
            square = {
                // @ts-ignore
                x: annotation.startX,
                // @ts-ignore
                y: annotation.startY,
                size: width
            };
        }

        console.log(annotation.startX, annotation.startY, square.size)
        // @ts-ignore
        canvas.removeEventListener("mousemove", drawAnnotation);
    };

    async function cutSquareFromImage(): Promise<string>  {
          return await convertURIToImageData(canvas.toDataURL()).then(res =>
            {
                return getRedSquare(res)
            });

       // setAnnotationResult(result);
    }

    function convertURIToImageData(URI: any): Promise<ImageData> {
        return new Promise(function(resolve, reject) {
            if (URI == null) return reject();
            image.addEventListener('load', function() {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(context.getImageData(0, 0, canvas.width, canvas.height));
            }, false);
            image.src = URI;
        });
    }

    function getRedSquare(imageData: ImageData): string {
        // Extract the area inside the red square
        const newCanvas = document.createElement('canvas');
        newCanvas.width = 100;
        newCanvas.height = 100;
        const newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(canvas, square.x, square.y, square.size, square.size, 0, 0, 100, 100);

        // Get the new data URL
        const newDataUrl = newCanvas.toDataURL("image/png");

        console.log(newDataUrl)
        // Return the new data URL
        return newDataUrl;
    }

    const loadImage = () => {
        const fileInput = document.getElementById("fileInput");
        const uploadWindow = document.getElementById("fileUploadField");
        uploadWindow.style.height = "0";
        uploadWindow.style.visibility = "hidden";

        image = new Image();
        // @ts-ignore
        image.src = URL.createObjectURL(fileInput.files[0]);

        image.onload = function() {
            scaleImage(image, 650, 650);
            // Set the canvas dimensions
            canvas = document.getElementById("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            // Get the canvas context
            context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            // @ts-ignore
            canvas.addEventListener("mousedown", startAnnotation);
            // @ts-ignore
            canvas.addEventListener("mouseup", endAnnotation);

            };
    }

    function scaleImage(image:any, maxWidth:any, maxHeight:any) {
        // Get the original aspect ratio of the image
        const aspectRatio = image.width / image.height;

        // Calculate the new width and height
        let newWidth = image.width;
        let newHeight = image.height;
        if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newHeight = newWidth / aspectRatio;
        }
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
        }

        // Scale the image
        image.width = newWidth;
        image.height = newHeight;
    }

    /* Set up canvas */
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

    const clearCanvas = (): void => {
        const uploadWindow = document.getElementById("fileUploadField");
        uploadWindow.style.visibility = "collapse";
        prepareCanvas();
        setCount(0);
    }

    /* Handwriting on canvas */
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
                handwritten,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                clearCanvas,
                draw,
                loadImage,
                setHandwritten,
                cutSquareFromImage
            }}
        >
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas: any = () => useContext(CanvasContext);