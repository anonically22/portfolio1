import { useState, useEffect, useRef } from 'react';

export const useTypingEffect = (text, speed = 100, pause = 2000) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!text) return;

        const handleTyping = () => {
            if (!isDeleting) {
                if (index < text.length) {
                    setDisplayText(prev => prev + text.charAt(index));
                    setIndex(prev => prev + 1);
                    timeoutRef.current = setTimeout(handleTyping, speed);
                } else {
                    // Pause at the end
                    timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(prev => prev.slice(0, -1));
                    timeoutRef.current = setTimeout(handleTyping, speed / 2);
                } else {
                    setIsDeleting(false);
                    setIndex(0);
                    timeoutRef.current = setTimeout(handleTyping, speed);
                }
            }
        };

        timeoutRef.current = setTimeout(handleTyping, speed);

        return () => clearTimeout(timeoutRef.current);
    }, [text, index, isDeleting, displayText, speed, pause]);

    return displayText;
};
