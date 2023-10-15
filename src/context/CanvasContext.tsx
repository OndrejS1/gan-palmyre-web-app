import React, {FC, ReactNode, useContext, useRef, useState} from "react";
import placeholderImage from '../resources/image/placeholder-palmyre-2.png';
import {isMobile} from 'react-device-detect';

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
    const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const hiddenContextRef = useRef<CanvasRenderingContext2D | null>(null);


    let square:any = {};
    const annotation:any = {};
    let canvas:any, context:any, image: HTMLImageElement;


    const startAnnotation = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        if(isMobile) {
            if(e instanceof TouchEvent) {
                const touch = e.touches[0];
                // @ts-ignore
                annotation.startX = touch.clientX - canvas.offsetLeft;
                // @ts-ignore
                annotation.startY = touch.clientY - canvas.offsetTop;
                canvas.addEventListener("touchmove", drawAnnotation);
            }
        } else {
            // @ts-ignore
            annotation.startX = e.clientX - canvas.offsetLeft + window.scrollX;
            // @ts-ignore
            annotation.startY = e.clientY - canvas.offsetTop + window.scrollY;
            canvas.addEventListener("mousemove", drawAnnotation);
        }
    };

    const drawAnnotation = (e: MouseEvent | TouchEvent) => {
        context.strokeStyle = "red";
        context.lineWidth = 1;

        // @ts-ignore
        context.clearRect(0, 0, image, canvas.width, canvas.height);
        // @ts-ignore
        context.drawImage(image, 0, 0, image.width, image.height);
        // @ts-ignore

        if(isMobile && e instanceof TouchEvent) {
            annotation.endX = e.touches[0].clientX - canvas.offsetLeft;
            // @ts-ignore
            annotation.endY = e.touches[0].clientY - canvas.offsetTop;
        } else {
            // @ts-ignore
            annotation.endX = e.clientX - canvas.offsetLeft + window.scrollX;
            // @ts-ignore
            annotation.endY = e.clientY - canvas.offsetTop + window.scrollY;
        }

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

    const endAnnotation = (e: MouseEvent | TouchEvent) => {
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

        // @ts-ignore
        if(isMobile) {
            canvas.removeEventListener("touchmove", drawAnnotation)
        } else {
            canvas.removeEventListener("mousemove", drawAnnotation);
        }
    };

    async function cutSquareFromImage(): Promise<string>  {
        const hiddenCanvas = hiddenCanvasRef.current;

        return await convertURIToImageData(hiddenCanvas.toDataURL()).then(() =>
            {
                return getRedSquare();
            });

       // setAnnotationResult(result);
    }

    function convertURIToImageData(URI: any): Promise<ImageData> {
        return new Promise((resolve, reject) => {
            if (!URI) {
                reject(new Error("No URI provided"));
                return;
            }

            const img = new Image();
            const cvs = document.createElement('canvas');
            const ctx = cvs.getContext('2d');

            img.onload = () => {
                cvs.width = img.width;
                cvs.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                resolve(ctx.getImageData(0, 0, img.width, img.height));
                img.removeEventListener('load', img.onload);
            };

            img.onerror = () => {
                reject(new Error("Failed to load image from URI"));
            };

            img.src = URI;
        });
    }

    function getRedSquare(): string {
        // Extract the area inside the red square
        const newCanvas = document.createElement('canvas');
        newCanvas.width = 100;
        newCanvas.height = 100;
        const newCtx = newCanvas.getContext('2d');
        newCtx.drawImage(canvas, square.x + 5, square.y + 5, square.size - 7, square.size - 7, 0, 0, 100, 100);

        // Get the new data URL
        // Return the new data URL
        return newCanvas.toDataURL("image/png");
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


            // Draw the image on the hidden canvas
            const hiddenCanvas = hiddenCanvasRef.current;
            const hiddenContext = hiddenCanvas.getContext("2d");
            hiddenCanvas.width = image.width;
            hiddenCanvas.height = image.height;
            hiddenContext.drawImage(image, 0, 0, image.width, image.height);

            if(isMobile) {
                // @ts-ignore
                canvas.addEventListener("touchstart", startAnnotation);
                // @ts-ignore
                canvas.addEventListener("touchend", endAnnotation);
            } else {
                // @ts-ignore
                canvas.addEventListener("mousedown", startAnnotation);
                // @ts-ignore
                canvas.addEventListener("mouseup", endAnnotation);
            }
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

        const newWidth = 200;
        const newHeight = 200;

        canvas.width = newWidth * 2;
        canvas.height = newHeight * 2;

        canvas.style.width = `${newWidth}px`;
        canvas.style.height = `${newHeight}px`;

        const context = canvas.getContext("2d")

        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 7;

        const image = new Image();
        image.src = placeholderImage;
        image.onload = () => {
            context.drawImage(image, 0, 0, newWidth, newHeight);
        };

        contextRef.current = context;
    };

    const clearCanvas = () => {
        if(!handwritten) {
            const cvs = document.getElementById("canvas");
            const uploadWindow = document.getElementById("fileUploadField");

            if(cvs != null) {
                document.getElementById("canvas").remove();
                uploadWindow.style.height = "200";
                uploadWindow.style.visibility = "visible";

                const canv = document.createElement('canvas');
                canv.id = 'canvas';

                document.body.appendChild(canv); // adds the canvas to the body element
                document.getElementById('imageBox').appendChild(canv); // adds the canvas to #someBox
            }
        } else {
            prepareCanvas();
            setCount(0);
        }
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
                hiddenCanvasRef,
                hiddenContextRef,
                handwritten,
                prepareCanvas,
                startDrawing,
                finishDrawing,
                clearCanvas,
                draw,
                loadImage,
                cutSquareFromImage,
                setHandwritten
            }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas: any = () => useContext(CanvasContext);