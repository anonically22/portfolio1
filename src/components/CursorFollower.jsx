import { useEffect, useState } from 'react';

const CursorFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        let animationFrameId;

        const updateTrailingPosition = () => {
            setTrailingPosition(prev => {
                const dx = position.x - prev.x;
                const dy = position.y - prev.y;

                // Adjust the multiplier (0.15) to change the lag amount (lower = more lag)
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15
                };
            });

            animationFrameId = requestAnimationFrame(updateTrailingPosition);
        };

        animationFrameId = requestAnimationFrame(updateTrailingPosition);
        return () => cancelAnimationFrame(animationFrameId);
    }, [position]);

    return (
        <>
            <div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent-blue pointer-events-none z-[9999] transition-opacity duration-300"
                style={{
                    transform: `translate(${trailingPosition.x - 16}px, ${trailingPosition.y - 16}px)`,
                }}
            />
            <div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-blue pointer-events-none z-[9999]"
                style={{
                    transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
                }}
            />
        </>
    );
};

export default CursorFollower;
