import React, {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { SoundboardSoundConfig } from "../types";
import { $channels, setChannelSound } from "../nanoStore";
import { useStore } from "@nanostores/react";
import Play from "./svgs/play";

declare global {
  interface Window {
    YT: YT.Player;
    onYouTubeIframeAPIReady: () => void;
  }
}

type SoundSquareProps = {
  sound: SoundboardSoundConfig | null;
  onReorder?: (fromIndex: number, toIndex: number) => void;
  index: number;
};

const SoundSquare = ({
  sound,
  onReorder = () => {},
  index,
}: SoundSquareProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const channels = useStore($channels);
  const channel = channels.find((c) => c.name === sound?.channel);

  const isPlaying = sound && channel?.sound?.id === sound.id;
  const channelState = isPlaying ? channel?.state : 0;
  const color = channel?.color || "grey";

  let style: CSSProperties = {};
  let className = `bg-background grid grid-cols-[24px 1fr] items-center justify-center size-50 hover:scale-105 active:scale-95 cursor-pointer transition-all border-2 border-solid rounded-sm animate-slide-in`;

  if (isPlaying) {
    switch (channelState) {
      //unstarted
      case -1:
        className += " hover:shadow hover:shadow-md shadow-gray-600";
        style = {
          borderColor: color,
        };
        break;
      //ended
      case 0:
        className += " hover:shadow hover:shadow-md shadow-gray-600";
        style = {
          borderColor: color,
        };

        break;
      //playing
      case 1:
        className +=
          " hover:shadow hover:shadow-md shadow-gray-600 shadow shadow-sm";
        style = {
          borderColor: color,
          backgroundColor: color,
        };
        break;
      //paused
      case 2:
        className +=
          " hover:shadow hover:shadow-md shadow-gray-600 shadow shadow-sm";
        style = {
          borderColor: color,
          backgroundColor: color,
        };
        break;
      //buffering
      case 3:
        className +=
          " hover:shadow hover:shadow-md shadow-gray-600 shadow shadow-sm opacity-60";
        style = {
          borderColor: color,
          backgroundColor: color,
        };
        break;
    }
  } else {
    className += " hover:shadow hover:shadow-md shadow-gray-600";
    style = {
      borderColor: color,
    };
  }

  return (
    <button
      ref={ref}
      draggable
      style={style}
      className={className}
      onDragStart={(e) => {
        e.dataTransfer.setData("sound-index", index.toString());
        e.dataTransfer.effectAllowed = "move";
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
        e.preventDefault();
        if (channel?.sound?.id === sound?.id && channel?.ref) {
          const state = channel?.ref?.getPlayerState();
          console.log("STATE", state);
          switch (state) {
            //unstarted
            case -1:
              channel.ref.playVideo();
              break;

            //ended
            case 0:
              channel.ref.playVideo();
              break;

            //playing
            case 1:
              channel.ref.pauseVideo();
              break;

            //paused
            case 2:
              channel.ref.playVideo();
              break;

            //buffering
            case 3:
              break;
          }
        } else if (sound) {
          setChannelSound(sound, sound.channel);
        }
      }}
    >
      <h6>{sound?.name || "EMPTY"}</h6>
    </button>
  );
};

export default SoundSquare;
