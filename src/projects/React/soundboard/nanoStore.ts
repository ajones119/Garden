
import { atom } from "nanostores";
import { type Channel, type SoundboardSoundConfig } from "./types";
import { CHANNEL_CONFIG } from "./utils";

export const $channels = atom<Channel[]>(CHANNEL_CONFIG);

export const updateChannel = (
    channelName: string,
    updates: Partial<Channel>
) => {
    const channels = [...$channels.get()];
    const channelIndex = getChannelIndexFromName(channelName);

    if (channelIndex === undefined || channelIndex < 0 || channelIndex >= channels.length) return;

    channels[channelIndex] = { ...channels[channelIndex], ...updates };
    $channels.set(channels);
};

export const getChannelIndexFromName = (channelName: string) => {
    return $channels.get().findIndex(c => c.name === channelName);
}

export const setChannelSound = (sound: SoundboardSoundConfig, channelName: string) =>
    updateChannel(channelName, { sound });

export const setChannelPlayerRef = (ref: YT.Player, channelName: string) =>{
    updateChannel(channelName, { ref });
}

export const setChannelState = (state: number, channelName: string) =>{
    updateChannel(channelName, { state });
}

export const getChannelFromIsPlayingId = (soundId = '', channelName = ''): Channel | null => {
    const channel = $channels.get().find(c => c.name === channelName);

    if (channel && channel?.sound?.id === soundId) {
        return channel;
    }

    return null;
}
