import { floor, random } from 'lodash';
import { useEffect } from 'react';
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
    return name.slice(0, 1).toUpperCase() + name.slice(1)
}