export function scaleImage(image: any, maxWidth: any, maxHeight: any): void {
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
