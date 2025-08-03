import React, { useEffect, useReducer, useRef, useState } from "react";
import type { SoundboardSoundConfig } from "../types";

type SoundSquareProps = {
    sound: SoundboardSoundConfig | null
    playing?: boolean;
    onPlay: (sound: SoundboardSoundConfig) => void
    onReorder?: (fromIndex: number, toIndex: number) => void,
    index: number
}

const SoundSquare = ({sound, playing, onPlay, onReorder = () => {}, index}: SoundSquareProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    let className = "size-50 hover:scale-105 cursor-pointer transition-all"
    className += sound ? " size-50 border border-solid border-border" : " size-50 bg-muted"
    if (!playing) {
        className += " opacity-80 hover:opacity-100 transition-all duration-150"
    } else {
        className += " border-green-400 shadow shadow-green-200 shadow-md"
    }

    return (
        <button
            ref={ref}
            draggable
            className={className}
            onDragStart={(e) => {
                e.dataTransfer.setData("sound-index", index.toString());
                e.dataTransfer.effectAllowed = "move";
                console.log('DRAG')
            }}
            onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData("sound-index"), 10);
                onReorder(fromIndex, index);
            }}
            onClick={(e) => {
                e.preventDefault()
                sound && onPlay(sound)
                }}
            >
            <h6>{playing && "🔉"} {sound?.name || "EMPTY"}</h6>
            
        </button>
    )
}

export default SoundSquare;