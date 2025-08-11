export type SoundboardSoundConfig = {
  id: string;
  name: string;
  channel: string;
};

export type Channel = {
  name: string;
  color: string;
  sound: SoundboardSoundConfig | null;
  ref: YT.Player | null;
  state: number;
};
