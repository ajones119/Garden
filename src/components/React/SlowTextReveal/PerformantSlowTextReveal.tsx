import React, { useEffect, useRef, useState } from 'react';

type Props = {
    text: string,
    delay?: number,
    initialText?: string,
    step?: number
}

const PerformantSlowTextReveal = ({text, delay = 10, initialText = "", step = 1}: Props) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastTextRef = useRef(text);
    const currentLengthRef = useRef(initialText.length);
    const [isFullyRevealed, setIsFullyRevealed] = useState(false);

    useEffect(() => {
        if (!textRef?.current) return

        // Only reset if text is significantly changed
        const isNewText = !text.startsWith(lastTextRef.current) && !lastTextRef.current.startsWith(text);
        const isFirstMount = lastTextRef.current === text && textRef.current.textContent === "";

        if (isNewText || isFirstMount) {
            // Complete reset for new text or first mount
            textRef.current.textContent = initialText;
            currentLengthRef.current = initialText.length;
            setIsFullyRevealed(false);

            lastTextRef.current = text;

            //clear existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            if (currentLengthRef.current >= text.length) {
                setIsFullyRevealed(true);
                textRef.current.textContent = text;
                return;
            }

            intervalRef.current = setInterval(() => {
                if (!textRef.current) return;

                currentLengthRef.current += step;
                textRef.current.textContent = text.slice(0, currentLengthRef.current);

                if (currentLengthRef.current >= text.length) {
                    setIsFullyRevealed(true);
                    
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }

                }

            }, delay)
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [text, step, initialText]);

    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
        <span>
            <div>RenderCount {renderCount.current}</div>
            <span ref={textRef} />
            {!isFullyRevealed && <span className='animate-pulse'>|</span>}
        </span>
    )
}

export default PerformantSlowTextReveal;