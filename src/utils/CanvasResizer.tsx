/**
 * Hermite resize - fast image resize/resample using Hermite filter. 1 cpu version!
 * https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality
 *
 * @param {HTMLCanvasElement} canvas
 * @param {int} width
 * @param {int} height
 * @param {boolean} resizeCanvOption if true, canvas will be resized. Optional.
 *
 * @return {HTMLCanvasElement} resized canvas
 */
export function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number, resizeCanvOption: boolean): HTMLCanvasElement {
    canvas.setAttribute('crossOrigin', '');
    const width_source = canvas.width;
    const height_source = canvas.height;
    width = Math.round(width);
    height = Math.round(height);

    const ratio_w = width_source / width;
    const ratio_h = height_source / height;
    const ratio_w_half = Math.ceil(ratio_w / 2);
    const ratio_h_half = Math.ceil(ratio_h / 2);

    const ctx = canvas.getContext("2d");

    const img = ctx.getImageData(0, 0, width_source, height_source);
    const img2 = ctx.createImageData(width, height);
    const data = img.data;
    const data2 = img2.data;

    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            const x2 = (i + j * width) * 4;
            let weight = 0, weights = 0, weights_alpha = 0;
            let gx_r = 0, gx_g = 0, gx_b = 0, gx_a = 0;

            let center_y = (j + 0.5) * ratio_h;
            const yy_start = Math.floor(j * ratio_h);
            const yy_stop = Math.ceil((j + 1) * ratio_h);
            for (let yy = yy_start; yy < yy_stop; yy++) {
                const dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                const center_x = (i + 0.5) * ratio_w;
                const w0 = dy * dy; //pre-calc part of w
                const xx_start = Math.floor(i * ratio_w);
                const xx_stop = Math.ceil((i + 1) * ratio_w);
                for (let xx = xx_start; xx < xx_stop; xx++) {
                    const dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                    const w = Math.sqrt(w0 + dx * dx);
                    if (w >= 1) {
                        //pixel too far
                        continue;
                    }
                    //hermite filter
                    weight = 2 * w * w * w - 3 * w * w + 1;
                    const pos_x = 4 * (xx + yy * width_source);
                    //alpha
                    gx_a += weight * data[pos_x + 3];
                    weights_alpha += weight;
                    //colors
                    if (data[pos_x + 3] < 255)
                        weight = weight * data[pos_x + 3] / 250;
                    gx_r += weight * data[pos_x];
                    gx_g += weight * data[pos_x + 1];
                    gx_b += weight * data[pos_x + 2];
                    weights += weight;
                }
            }
            data2[x2] = gx_r / weights;
            data2[x2 + 1] = gx_g / weights;
            data2[x2 + 2] = gx_b / weights;
            data2[x2 + 3] = gx_a / weights_alpha;
        }
    }
    //clear and resize canvas
    if (resizeCanvOption === true) {
        canvas.width = width;
        canvas.height = height;
    } else {
        ctx.clearRect(0, 0, width_source, height_source);
    }

    //draw
    ctx.putImageData(img2, 0, 0);

    return canvas;
}