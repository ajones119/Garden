import React, { useEffect, useRef } from "react";

type YTSoundPlayerProps = {
    id?: string,
    playing?: boolean,
    paused?: boolean
}


declare global {
  interface Window {
    YT: YT.Player;
    onYouTubeIframeAPIReady: () => void;
  }
}
const YTSoundPlayer = ({id, playing, paused}: YTSoundPlayerProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<YT.Player | null>(null);


useEffect(() => {
  const loadYouTubeAPI = (): Promise<typeof YT> => {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      } else {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
        document.body.appendChild(tag);
      }
    });
  };

  loadYouTubeAPI().then((YT) => {
    if (!containerRef.current) return;

    if (playerRef.current) {
      // Just load a new video ID
      playerRef.current.loadVideoById(id ?? '');
    } else {
      // Create the player
      playerRef.current = new YT.Player(containerRef.current, {
        videoId: id ?? '',
        height: '300px',
        width: '300px',
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            if (playing) playerRef.current?.playVideo();
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
}, [id]); // id change now just loads new video


    useEffect(() => {
        if (!playerRef.current) return;

        if (playing) {
          if (paused) {
            playerRef.current.pauseVideo();
          } else {
            playerRef.current.playVideo();
          }
        } else {
            playerRef.current.stopVideo();

        }
    }, [playing, paused]);

    return (
        <div ref={containerRef} style={{
          display: 'none'
        }} />
    )
}

export default YTSoundPlayer;