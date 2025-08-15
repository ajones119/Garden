import React, { useEffect, useRef, useState } from 'react';

type Props = {
    text: string,
    delay?: number,
    initialText?: string,
    step?: number,
}

const NonPerformantSlowTextReveal = ({text, delay = 10, initialText = "", step = 1}: Props) => {
    const [revealedText, setRevealedText] = useState(initialText);
    const isFullyRevealed = text.length <= revealedText.length

    useEffect(()=> {
        if (revealedText.length >= text.length) return;

        const interval = setInterval(() => {
            setRevealedText(text.slice(0, revealedText.length + step));
        }, delay)
        return () => clearInterval(interval);
    }, [
        text, revealedText, delay
    ])

    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
        <span>
            <div>RenderCount {renderCount.current}</div>
            <span>{revealedText}</span>
            {!isFullyRevealed && <span className='animate-pulse'>|</span>}
        </span>
    )
}

export default NonPerformantSlowTextReveal;