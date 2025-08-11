import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Channel } from "../types";
import { useStore } from "@nanostores/react";
import { $channels, setChannelPlayerRef, setChannelState } from "../nanoStore";
import Play from "./svgs/play";
import Pause from "./svgs/pause";
import Mute from "./svgs/mute";
import Loud from "./svgs/loud";
import Soft from "./svgs/soft";
import Repeat from "./svgs/repeat";

type YTSoundPlayerProps = {
  channelId: string;
  onFilter: () => void;
};

declare global {
  interface Window {
    YT: YT.Player;
    onYouTubeIframeAPIReady: () => void;
  }
}
const YTSoundPlayer = ({ channelId, onFilter }: YTSoundPlayerProps) => {
  const channels = useStore($channels);
  const channel = channels.find((c) => c.name === channelId);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [volume, setVolume] = useState(100);
  const [repeat, setRepeat] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    return () => {
      if (channel?.ref?.destroy) {
        channel.ref.destroy();
      }
    };
  }, [channelId]);

  useEffect(() => {
    svgRef?.current?.pauseAnimations();
    const loadYouTubeAPI = (): Promise<typeof YT> => {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve(window.YT);
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          window.onYouTubeIframeAPIReady = () => resolve(window.YT);
          document.body.appendChild(tag);
        }
      });
    };

    loadYouTubeAPI().then((YT) => {
      if (!playerContainerRef.current) return;
      if (channel?.ref) {
        // Just load a new video ID
        channel.ref.loadVideoById(channel?.sound?.id ?? "");
      } else if (channel) {
        // Create the player
        channel.ref = new YT.Player(playerContainerRef.current, {
          videoId: channel?.sound?.id || "",
          height: "300px",
          width: "300px",
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            //mute: 1
          },
          events: {
            onReady: () => {
              channel.ref?.playVideo();
            },
            onStateChange: (e) => {
              setChannelState(e?.data, channelId);

              if (e?.data === 1) {
                svgRef?.current?.unpauseAnimations();
              } else {
                svgRef?.current?.pauseAnimations();
              }

              console.log("e", e);
            },
            onApiChange: (e) => {
              console.log("api change", e);
            },
          },
        });
      }
    });

    // Optional cleanup if you want to fully destroy the player
    return () => {
      // Only destroy if you're really replacing the component
      // Otherwise just keep it alive
    };
  }, [channel?.sound]); // id change now just loads new video

  useEffect(() => {
    channel?.ref?.setVolume(volume);
  }, [volume]);

  const repeatHandlerRef = useRef<(e: YT.OnStateChangeEvent) => void>(null);

  useEffect(() => {
    repeatHandlerRef.current = (e: YT.OnStateChangeEvent) => {
      if (e?.data === 0 && channel?.ref && repeat) {
        channel.ref.playVideo();
      }
    };
  }, [repeat, channel?.ref]);

  useEffect(() => {
    const handler = (e: YT.OnStateChangeEvent) => {
      repeatHandlerRef.current?.(e);
    };

    if (channel?.ref) {
      channel.ref.addEventListener("onStateChange", handler);
      return () => {
        channel.ref?.removeEventListener("onStateChange", handler);
      };
    }
  }, [channel?.ref]);

  const controlButtonBaseStyling =
    "p-1 border border-black text-sm cursor-pointer rounded-lg hover:font-semibold active:translate-y-[2px] transition-all size-6";

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: channel?.color }}
      className="w-full p-4 relative"
    >
      <div
        ref={playerContainerRef}
        style={{
          display: showVideo ? "block" : "none",
        }}
      />
      <div className="flex items-center">
        <div>
          <svg ref={svgRef} width="24" height="24" viewBox="0 0 100 100">
            <rect x="20" y="30" width="15" height="40" fill="mediumseagreen">
              <animate
                attributeName="height"
                values="40;10;40"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="30;60;30"
                dur="1s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="40" y="30" width="15" height="40" fill="mediumseagreen">
              <animate
                attributeName="height"
                values="40;10;40"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="30;60;30"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="60" y="30" width="15" height="40" fill="mediumseagreen">
              <animate
                attributeName="height"
                values="40;10;40"
                dur="1.1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="30;60;30"
                dur="1.1s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
        <h6 className="font-bold text-lg text-white line-clamp-1">
          {channel?.name?.toLocaleUpperCase()}{" "}
          {channel?.sound ? ` - ${channel.sound.name}` : ""}
        </h6>
      </div>
      <div className="flex gap-1 mt-1">
        <button
          onClick={() => channel?.ref?.playVideo()}
          className={`${controlButtonBaseStyling} ${channel?.state === 1 ? "bg-white text-black" : ""}`}
        >
          <Play />
        </button>
        <button
          onClick={() => channel?.ref?.pauseVideo()}
          className={`${controlButtonBaseStyling} ${channel?.state === 2 ? "bg-white text-black" : ""}`}
        >
          <Pause />
        </button>
        <div className="h-6 w-[1px] bg-white" />
        <button
          onClick={() => setVolume(0)}
          className={`${controlButtonBaseStyling} ${volume === 0 ? "bg-white text-black" : ""}`}
        >
          <Mute />
        </button>
        <button
          onClick={() => setVolume(50)}
          className={`${controlButtonBaseStyling} ${volume === 50 ? "bg-white text-black" : ""}`}
        >
          <Soft />
        </button>
        <button
          onClick={() => setVolume(100)}
          className={`${controlButtonBaseStyling} ${volume === 100 ? "bg-white text-black" : ""}`}
        >
          <Loud />
        </button>
        <div className="h-6 w-[1px] bg-white" />
        <button
          onClick={() => setRepeat(!repeat)}
          className={`${controlButtonBaseStyling} ${repeat ? "bg-white text-black" : ""}`}
        >
          <Repeat />
        </button>
      </div>
      <div className="absolute right-2 top-2">
        <input type="checkbox" onChange={onFilter} />
      </div>
    </div>
  );
};

export default YTSoundPlayer;
