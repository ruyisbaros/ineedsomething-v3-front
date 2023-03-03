import { floor, random } from 'lodash';
import { useEffect, useRef } from 'react';
import { avatarColors } from './static';


export function createAvatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)]
}
/* <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" id="external-flamingo" crossorigin="anonymous"> */
export function generateAvatar(text, bcgColor, fgColor = "white") {

    const canvas = document.createElement("canvas")
    canvas.setAttribute("crossOrigin", "anonymous")
    const context = canvas.getContext("2d")

    context.fillStyle = bcgColor
    context.fillRect(0, 0, 300, 300)
    context.font = "normal 80px sans-serif"
    context.fillStyle = fgColor
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, 155, 85)
    //context.setAttribute("crossOrigin", "anonymous")

    return canvas.toDataURL("image/png")
}

export function useOutsideClick(ref, fn) {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            fn()
        }
        document.addEventListener("mousedown", listener)
        document.addEventListener("touchstart", listener)
        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener)
        }
    }, [ref])
}

export function capitalName(name) {
    return name?.slice(0, 1).toUpperCase() + name.slice(1)
}

export function useEffectOnce(callBack) {
    const calledOnce = useRef(false)

    useEffect(() => {
        if (!calledOnce.current) {
            callBack()
            calledOnce.current = true
        }
    }, [callBack])
}

export function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

export async function readImageAsBase64(file) {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
            resolve(reader.result);
        });

        reader.addEventListener('error', (event) => {
            reject(event);
        });

        reader.readAsDataURL(file);
    });
    return fileValue;
}

export const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

export function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);

    return {
        width:
            Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("crossOrigin", "anonymous")
    const ctx = canvas.getContext("2d");


    if (!ctx) {
        return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    return canvas.toDataURL('image/jpeg');

    // As a blob
    /* return new Promise((resolve, reject) => {
        canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file));
        }, "image/jpeg");
    }); */
}
