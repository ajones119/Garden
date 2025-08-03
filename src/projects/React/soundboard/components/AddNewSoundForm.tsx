import React, { useState, type FormEvent } from 'react';
import type { SoundboardSoundConfig } from '../types';
import { extractYTIDFromLink } from '../utils';
import BasicButton from '../../../../components/React/Buttons/BasicButton';

type FormProps = {
    onSave: (config: SoundboardSoundConfig) => void;
}

const AddNewSoundForm = ({onSave}: FormProps) => {
    const [url, setUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const handleSave = (e: FormEvent) => {
        e?.preventDefault();
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
            name
        }
        onSave(config);
        setUrl('');
        setName('');
        setUrlError('')
        setNameError('');
    }

    return (
        <form onSubmit={handleSave} className='bg-muted flex flex-col gap-2 p-2'>
            <label htmlFor='url'>Youtube URL</label>
            <input id="url" type="text" className='w-full bg-muted border border-border border-solid color-foreground' value={url} onChange={(e) => setUrl(e?.target?.value)} placeholder="Enter URL..." />
            {urlError && <p className='text-red-500 text-xs animate-slide-in'>{urlError}</p>}
            <label htmlFor='name' className='mt-4'>Sound Name</label>
            <input id="name" type="text" className='w-full bg-muted border border-border border-solid color-foreground' value={name} onChange={(e) => setName(e?.target?.value)} placeholder="Enter name..." />
            {nameError && <p className='text-red-500 text-xs animate-slide-in'>{nameError}</p>}
            <BasicButton className='mt-4'>Save</BasicButton>
        </form>
    )
}

export default AddNewSoundForm;