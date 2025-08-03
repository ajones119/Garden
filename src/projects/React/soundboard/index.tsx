import React, { useEffect, useMemo, useRef, useState } from 'react';
import FileInput from "../../../components/Solid/FileInput/FileInput.solid";

import TEMP_IMG from "../../../assets/mainBackgroundFull.jpeg"
import type { SoundboardSoundConfig } from './types';
import SoundSquare from './components/SoundSquare';
import useLocalStorage from '../../../components/React/hooks/UseLocalStorage';
import YTSoundPlayer from './components/YTSoundPlayer';
import AddNewSoundForm from './components/AddNewSoundForm';
import BasicButton from '../../../components/React/Buttons/BasicButton';
import TrashDropzone from './components/TrashDropzone';

const STORAGE_KEY = 'garden-soundboard-json-config'

const Soundboard = () => {
    const [currentId, setCurrentId] = useState("");
    const [sounds, setSounds] = useLocalStorage({key: STORAGE_KEY, initialValue: Array(0).fill(null)})
    const [isPaused, setIsPaused] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <div className="w-full h-full p-1 pt-3">
            <div className="fixed right-2 bottom-2 transition-all">
                {isAddOpen ? (<div className='relative'>
                    <button className='absolute right-3 top-1 cursor-pointer' onClick={() => setIsAddOpen(false)}>x</button>
                <AddNewSoundForm onSave={(newConfig) => {
                    const firstNullIndex = sounds.findIndex(value => !value);
                    const tempSounds = [...sounds];
                    if (firstNullIndex === -1) {
                        tempSounds.unshift(newConfig)
                        setSounds(tempSounds);
                    } else {
                        tempSounds[firstNullIndex] = newConfig;
                        setSounds(tempSounds);
                    }
                    setIsAddOpen(false);
                }} />
                </div>) : 
                
                (<BasicButton onClick={(e) =>{
                    e.preventDefault();
                    setIsAddOpen(!isAddOpen)
                }}>+</BasicButton>)
                }
            </div>
            { currentId && 
                <div className="fixed left-2 bottom-2 animate-pop-in">
                    <BasicButton onClick={(e) =>{
                    e.preventDefault();
                    setIsPlaying(!isPaused)
                    }}>{!isPaused ? "⏸️" : "▶️"}</BasicButton>
                </div>
            }
            <TrashDropzone onDropIndex={(fromIndex) => {
                const tempSounds = [...sounds];
                tempSounds.splice(fromIndex, 1);
                setSounds(tempSounds);
            }} />
            <YTSoundPlayer id={currentId} playing={!!currentId} paused={isPaused}/>
            <div className='mx-auto w-11/12 flex flex-wrap gap-4 justify-center items-center'>
                {
                    sounds.map((sound, index) => <SoundSquare key={`${sound?.id} - ${sound?.title}`} onReorder={(fromIndex, toIndex) => {
                        if (fromIndex === toIndex) return;

                        const tempSounds = [...sounds];
                        const [moved] = tempSounds.splice(fromIndex, 1);
                        tempSounds.splice(toIndex, 0, moved);
                        setSounds(tempSounds)
                    }} index={index} onPlay={(sound) => {
                        console.log('sound', sound, currentId, sound.id === currentId)
                        if (sound.id === currentId) {
                            console.log("SET")
                            setIsPaused(!isPaused);
                        } else {
                            setCurrentId(sound.id);
                        }
                    }} sound={sound} playing={currentId === sound?.id} />)
                }
                <div onClick={() => setIsAddOpen(true)} className=' cursor-pointer size-50 bg-muted flex items-center justify-center hover:scale-105 hover:bg-accent transition-all'>
                    <h3 className='text-2xl font-bold'> + </h3>
                </div>
            </div>
        </div>
    )
}

export default Soundboard;