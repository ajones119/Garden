import type { Channel } from "./types";

export const extractYTIDFromLink = (url: string): string | null => {
      const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const CHANNEL_CONFIG: Channel[] = [
  {name: 'music', color: 'magenta', sound: null, ref: null, state: 0},
  {name: 'ambiance', color: 'green', sound: null, ref: null, state: 0},
  {name: 'effect', color: 'orange', sound: null, ref: null, state: 0},
];

export const CHANNEL_LIST = CHANNEL_CONFIG.map(c => c.name);