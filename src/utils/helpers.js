import { floor, random } from 'lodash';
import { useEffect, useRef } from 'react';
import { avatarColors } from './static';


export function createAvatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)]
}

export function generateAvatar(text, bcgColor, fgColor = "white") {

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    context.fillStyle = bcgColor
    context.fillRect(0, 0, 300, 300)
    context.font = "normal 80px sans-serif"
    context.fillStyle = fgColor
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, 155, 85)

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