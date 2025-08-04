import React, { useState, type FormEvent } from 'react';
import type { SoundboardSoundConfig } from '../types';
import { CHANNEL_LIST, extractYTIDFromLink } from '../utils';
import BasicButton from '../../../../components/React/Buttons/BasicButton';
import type { Option } from '../../../../components/React/Inputs/RadioButtons';
import RadioButtons from '../../../../components/React/Inputs/RadioButtons';


const CHANNEL_OPTIONS: Option<string>[] = CHANNEL_LIST.map(channel => ({value: channel, label: channel.toUpperCase()}))
const DEFAULT_CONFIG = {
        url: '',
        name: '',
        channel: CHANNEL_LIST[0]
    }

type FormProps = {
    onSave: (config: SoundboardSoundConfig) => void;
}

const AddNewSoundForm = ({onSave}: FormProps) => {
    const [urlError, setUrlError] = useState('');
    const [nameError, setNameError] = useState('');
    const [currentConfig, setCurrentConfig] = useState(DEFAULT_CONFIG)

    const handleSave = (e: FormEvent) => {
        e?.preventDefault();
        const {url, name, channel} = currentConfig;
        const id = extractYTIDFromLink(url.trim());
        if (!id || !name.trim()) {
            if (!id) {
                setUrlError("Must be a valid Youtube link")
            }

            if (!name.trim()) {
                setNameError('Name is required')
            }

            return;
        }

        const config: SoundboardSoundConfig = {
            id,
            name,
            channel
        }
        onSave(config);
        setCurrentConfig(DEFAULT_CONFIG)
        setUrlError('')
        setNameError('');
    }

    return (
        <form onSubmit={handleSave} className='bg-muted flex flex-col gap-2 p-2'>
            <label htmlFor='url'>Youtube URL</label>
            <input id="url" type="text" className='w-full bg-muted border border-border border-solid color-foreground' value={currentConfig.url} onChange={(e) => setCurrentConfig({...currentConfig, url: e?.target?.value})} placeholder="Enter URL..." />
            {urlError && <p className='text-red-500 text-xs animate-slide-in'>{urlError}</p>}
            <label htmlFor='name' className='mt-4'>Sound Name</label>
            <input id="name" type="text" className='w-full bg-muted border border-border border-solid color-foreground' value={currentConfig.name} onChange={(e) => setCurrentConfig({...currentConfig, name: e?.target?.value})} placeholder="Enter name..." />
            {nameError && <p className='text-red-500 text-xs animate-slide-in'>{nameError}</p>}
            <label htmlFor='channel' className='mt-4'>Channel</label>
            <RadioButtons<string>
                id='channel'
                name="Channel"
                options={CHANNEL_OPTIONS}
                selected={currentConfig.channel}
                onChange={(value) => setCurrentConfig({...currentConfig, channel: value})}

            />
            <BasicButton className='mt-4'>Save</BasicButton>
        </form>
    )
}

export default AddNewSoundForm;