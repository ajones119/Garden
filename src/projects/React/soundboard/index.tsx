import React, { useState } from "react";
import SoundSquare from "./components/SoundSquare";
import useLocalStorage from "../../../components/React/hooks/UseLocalStorage";
import YTSoundPlayer from "./components/YTSoundPlayer";
import AddNewSoundForm from "./components/AddNewSoundForm";
import BasicButton from "../../../components/React/Buttons/BasicButton";
import TrashDropzone from "./components/TrashDropzone";
import { useStore } from "@nanostores/react";
import { $channels } from "./nanoStore";
import { CHANNEL_LIST } from "./utils";

const STORAGE_KEY = "garden-soundboard-json-config";
const initial = [
  { id: "iQiUgrHqB9w", name: "Shady Tavern", channel: "music" },
  { id: "0p79IBaksXU", name: "Tavern Brawl", channel: "ambiance" },
  { id: "Qu212ohS5XE", name: "Sneaky", channel: "music" },
  { id: "InVxyzKEcg4", name: "Tense situation", channel: "music" },
  { id: "_hRgHPpV4GA", name: "Rockfall", channel: "effect" },
  { id: "V_FimUxIhSg", name: "Army Marching", channel: "ambiance" },
  { id: "E8Ced6hW45k", name: "Sword Clash", channel: "effect" },
  { id: "x2UulCWGess", name: "Small Marketplace", channel: "ambiance" },
  { id: "rjyROIFCzbo", name: "Whimsical", channel: "music" },
  { id: "7wBzL62Va1k", name: "Investigation", channel: "music" },
  { id: "0rl7AatkjfA", name: "Large Battle", channel: "ambiance" },
  { id: "bMu19nVkafM", name: "War Drums", channel: "music" },
  { id: "_yh410lA9yI", name: "Celtic Music", channel: "music" },
  { id: "w7_7pz5-Jk0", name: "Thunderstorm", channel: "ambiance" },
  { id: "vyg5jJrZ42s", name: "Tavern Music", channel: "music" },
  { id: "CDWtH8eHeEU", name: "Spooky Foreboding", channel: "ambiance" },
  { id: "wG9q9iOYX3k", name: "Mario Jump", channel: "effect" },
];

const Soundboard = () => {
  const [sounds, setSounds] = useLocalStorage({
    key: STORAGE_KEY,
    initialValue: initial,
  });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [showInList, setShowInList] = useState(CHANNEL_LIST);
  const channels = useStore($channels);

  return (
    <div className="w-full p-1 py-3">
      <div className="fixed right-2 bottom-2 transition-all">
        {isAddOpen ? (
          <div className="relative">
            <button
              className="absolute right-3 top-1 cursor-pointer"
              onClick={() => setIsAddOpen(false)}
            >
              x
            </button>
            <AddNewSoundForm
              onSave={(newConfig) => {
                const firstNullIndex = sounds.findIndex((value) => !value);
                const tempSounds = [...sounds];
                if (firstNullIndex === -1) {
                  tempSounds.unshift(newConfig);
                  setSounds(tempSounds);
                } else {
                  tempSounds[firstNullIndex] = newConfig;
                  setSounds(tempSounds);
                }
                setIsAddOpen(false);
              }}
            />
          </div>
        ) : (
          <BasicButton
            onClick={(e) => {
              e.preventDefault();
              setIsAddOpen(!isAddOpen);
            }}
          >
            +
          </BasicButton>
        )}
      </div>

      <TrashDropzone
        onDropIndex={(fromIndex) => {
          const tempSounds = [...sounds];
          tempSounds.splice(fromIndex, 1);
          setSounds(tempSounds);
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 my-4 overflow-hidden rounded-md">
        {channels?.map((channel) => (
          <YTSoundPlayer
            onFilter={() => {
              if (showInList.includes(channel.name)) {
                setShowInList([
                  ...showInList.filter((c) => c !== channel.name),
                ]);
              } else {
                setShowInList([...showInList, channel.name]);
              }
            }}
            key={channel?.name}
            channelId={channel?.name}
          />
        ))}
      </div>
      <div
        className={`
                mx-auto my-3 w-11/12 grid grid-cols-1 gap-5 justify-items-center
                sm:grid-cols-2 sm:justify-items-stretch sm:max-w-110
                md:grid-cols-3 md:max-w-165
                lg:grid-cols-4 lg:max-w-215 `}
      >
        {sounds.map((config, index) => {
          return showInList.includes(config.channel) ? (
            <SoundSquare
              key={`${config?.id} - ${config?.name}`}
              onReorder={(fromIndex, toIndex) => {
                if (fromIndex === toIndex) return;

                const tempSounds = [...sounds];
                const [moved] = tempSounds.splice(fromIndex, 1);
                tempSounds.splice(toIndex, 0, moved);
                setSounds(tempSounds);
              }}
              index={index}
              sound={config}
            />
          ) : null;
        })}
        <div
          onClick={() => setIsAddOpen(true)}
          className=" cursor-pointer size-50 bg-muted flex items-center justify-center hover:scale-105 hover:bg-accent transition-all animate-slide-in"
        >
          <h3 className="text-2xl font-bold"> + </h3>
        </div>
      </div>
    </div>
  );
};

export default Soundboard;
